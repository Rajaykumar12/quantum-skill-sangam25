const { verifyFirebaseToken } = require('../config/firebase');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      console.log('No authentication token provided');
      return res.status(401).json({ message: 'Authentication required' });
    }

    console.log(`Token validation attempt: ${token.substring(0, 10)}...`);
    
    try {
      const decodedToken = await verifyFirebaseToken(token);
      req.user = { uid: decodedToken.uid };
      console.log(`Token validated successfully for user: ${decodedToken.uid}`);
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. Required roles: ${roles.join(', ')}` 
      });
    }
    next();
  };
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decodedToken = await verifyFirebaseToken(token);
      const user = await User.findOne({ firebaseUid: decodedToken.uid });
      
      if (user && user.isActive) {
        req.user = user;
        req.firebaseUser = decodedToken;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

// Fixed checkOwnership middleware - return a function instead of executing immediately
const checkOwnership = (req, res, next) => {
  try {
    // This function will be called during request handling, not route definition
    const resourceUserId = req.params.userId || req.body.userId || req.params.id;
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Admin can access any resource
    if (req.user.role === 'admin') {
      return next();
    }

    // User can only access their own resources
    if (resourceUserId && req.user._id.toString() !== resourceUserId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own resources.'
      });
    }

    next();
  } catch (error) {
    console.error('Ownership check error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error checking resource ownership'
    });
  }
};

// Middleware to check if user can modify resource
const checkResourceOwnership = (resourceModel) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      
      if (!resourceId) {
        return res.status(400).json({
          success: false,
          message: 'Resource ID is required'
        });
      }

      const resource = await resourceModel.findById(resourceId);
      
      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found'
        });
      }

      // Admin can modify any resource
      if (req.user.role === 'admin') {
        req.resource = resource;
        return next();
      }

      // Check if user owns the resource
      const ownerField = resource.applicant || resource.submittedBy || resource.user || resource.seller;
      
      if (!ownerField || ownerField.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only modify your own resources.'
        });
      }

      req.resource = resource;
      next();
    } catch (error) {
      console.error('Resource ownership check error:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Error checking resource ownership'
      });
    }
  };
};

module.exports = {
  authenticateUser,
  authorizeRoles,
  optionalAuth,
  checkOwnership,
  checkResourceOwnership
};
