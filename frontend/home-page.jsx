"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Users,
  FileText,
  Phone,
  ShoppingCart,
  MessageSquare,
  Star,
  ArrowRight,
  Menu,
  X,
  Clock,
  Globe,
  Lock,
  Building,
  Flag,
  MapPin,
  LogIn,
  LogOut,
  User,
  Heart,
  Award,
  CheckCircle,
  Zap,
  TrendingUp,
  GraduationCap,
  Home,
  Banknote,
  Calendar,
  Download,
  Eye,
  HomeIcon,
} from "lucide-react"
import ResourceMarketplace from "./resource-marketplace.jsx"
import GrievanceSystem from "./grievance-system.jsx"
import EmergencyNetwork from "./emergency-network.jsx"
import AuthModal from "./auth-modal"
import WelfareSchemes from "./welfare-schemes"

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const [currentPage, setCurrentPage] = useState("home")
  const [showAuthModal, setShowAuthModal] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState("")

  // Handle login
  const handleLogin = (role) => {
    setIsLoggedIn(true)
    setUserRole(role)
    setShowAuthModal(false)
  }

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole("")
    setCurrentPage("home")
  }

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsMenuOpen(false)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return renderHomePage()
      case "marketplace":
        return <ResourceMarketplace setCurrentPage={setCurrentPage} />
      case "grievance":
        return <GrievanceSystem setCurrentPage={setCurrentPage} />
      case "emergency":
        return <EmergencyNetwork setCurrentPage={setCurrentPage} />
      case "welfare-schemes":
        return <WelfareSchemes setCurrentPage={setCurrentPage} />
      default:
        return renderHomePage()
    }
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  }

  // Features data
  const features = [
    {
      icon: FileText,
      title: "Welfare Scheme Management",
      description:
        "Comprehensive catalog of welfare schemes with eligibility checker, application system, and real-time status tracking.",
      color: "bg-green-600",
      bgColor: "bg-green-50",
      page: "welfare-schemes",
    },
    {
      icon: Phone,
      title: "Emergency Contact Network",
      description:
        "SOS features, medical emergency connections, and comprehensive family support network for critical situations.",
      color: "bg-red-600",
      bgColor: "bg-red-50",
      page: "emergency",
    },
    {
      icon: ShoppingCart,
      title: "Resource Sharing Marketplace",
      description:
        "Exchange books, equipment, and housing resources with integrated messaging system for community support.",
      color: "bg-blue-600",
      bgColor: "bg-blue-50",
      page: "marketplace",
    },
    {
      icon: MessageSquare,
      title: "Grievance Redressal System",
      description:
        "Transparent complaint filing with priority classification, tracking, and resolution management system.",
      color: "bg-purple-600",
      bgColor: "bg-purple-50",
      page: "grievance",
    },
  ]

  const testimonials = [
    {
      name: "Colonel Rajesh Kumar",
      rank: "Colonel, Indian Army",
      unit: "Rajputana Rifles",
      content:
        "This platform has revolutionized how we manage welfare schemes. The transparency and efficiency are remarkable. Our families now have seamless access to all benefits.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Mrs. Priya Sharma",
      rank: "Military Spouse",
      unit: "Army Welfare Organization",
      content:
        "Finally, a system that understands our needs. The emergency network feature gives me peace of mind when my husband is deployed.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Major Arun Singh",
      rank: "Major, Indian Air Force",
      unit: "Fighter Squadron",
      content:
        "The resource marketplace helped me find suitable accommodation quickly. The community aspect brings our forces together digitally.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const renderHomePage = () => {
    return (
      <div className="min-h-screen bg-white">
        {/* Auth Modal */}
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />

        {/* Government Header */}
        <div className="bg-gradient-to-r from-orange-500 via-white to-green-600 h-1"></div>

        {/* Top Government Bar */}
        <div className="bg-gray-50 border-b border-gray-200 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  Ministry of Defence, Government of India
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  New Delhi
                </div>
              </div>
              <div className="flex items-center space-x-4 text-gray-600">
                <span>Last Updated: {new Date().toLocaleDateString("en-IN")}</span>
                <div className="flex items-center">
                  <Flag className="h-4 w-4 mr-1" />
                  भारत सरकार
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {!showAuthModal && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-0 bg-white shadow-md z-50 border-b-2 border-orange-500"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.02 }}>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Armed Forces Welfare Portal</h1>
                    <p className="text-sm text-gray-600 font-medium">सशस्त्र बल कल्याण पोर्टल</p>
                  </div>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  {[
                    { name: "Home", id: "home" },
                    { name: "Features", id: "features" },
                    { name: "Benefits", id: "benefits" },
                    { name: "About", id: "about" },
                  ].map((item) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-700 hover:text-orange-600 transition-colors font-medium px-3 py-2 rounded-md hover:bg-orange-50"
                      whileHover={{ y: -2 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}

                  {isLoggedIn ? (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {userRole === "officer" ? "Officer" : userRole === "family" ? "Family" : "Admin"}
                        </span>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" className="border-orange-500 text-orange-600" onClick={handleLogout}>
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </motion.div>
                    </div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white font-semibold px-6 py-2 shadow-lg"
                        onClick={() => setShowAuthModal(true)}
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </motion.div>
                  )}
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center space-x-4">
                  {isLoggedIn && (
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <motion.div
              initial={false}
              animate={{ height: isMenuOpen ? "auto" : 0 }}
              className="md:hidden overflow-hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-4 space-y-2">
                {[
                  { name: "Home", id: "home" },
                  { name: "Features", id: "features" },
                  { name: "Benefits", id: "benefits" },
                  { name: "About", id: "about" },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-3 px-4 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                  >
                    {item.name}
                  </button>
                ))}

                {isLoggedIn ? (
                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white font-semibold"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white font-semibold"
                    onClick={() => setShowAuthModal(true)}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.nav>
        )}

        {/* Hero Section */}
        <section
          id="home"
          className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-green-50"
        >
          <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-green-600/5" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 px-4 py-2 text-sm font-semibold">
                      <Star className="w-4 h-4 mr-2" />
                      Government of India Initiative
                    </Badge>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
                  >
                    Digital Welfare Platform for
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-600">
                      {" "}
                      Our Armed Forces
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-gray-700 leading-relaxed font-medium"
                  >
                    A comprehensive digital platform that streamlines welfare management, enhances community
                    connectivity, and provides transparent access to military welfare schemes for our brave servicemen
                    and their families.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-gray-600 leading-relaxed"
                  >
                    सशस्त्र बलों के कल्याण के लिए एक व्यापक डिजिटल मंच
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.div {...scaleOnHover}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                      onClick={() => scrollToSection("features")}
                    >
                      Explore Platform
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                  <motion.div {...scaleOnHover}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold"
                      onClick={() => scrollToSection("about")}
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">50K+</div>
                    <div className="text-sm text-gray-600 font-medium">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">15+</div>
                    <div className="text-sm text-gray-600 font-medium">Welfare Schemes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">24/7</div>
                    <div className="text-sm text-gray-600 font-medium">Support</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Animated Dashboard Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: [0, 2, -2, 0],
                      scale: [1, 1.01, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="bg-gradient-to-br from-orange-500 to-green-600 rounded-3xl p-8 shadow-2xl border-4 border-white"
                  >
                    <div className="bg-white rounded-2xl p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                            <Shield className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">Welfare Dashboard</p>
                            <p className="text-sm text-gray-600">Active Applications: 12</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 font-semibold">Secure</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {features.slice(0, 4).map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className={`${feature.bgColor} rounded-xl p-4 text-center border border-gray-100`}
                          >
                            <feature.icon className={`w-6 h-6 mx-auto mb-2 ${feature.color.replace("bg-", "text-")}`} />
                            <p className="text-xs font-semibold text-gray-700">{feature.title.split(" ")[0]}</p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-700">System Status</span>
                          <span className="text-xs text-green-600 font-semibold">All Systems Operational</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-orange-500 to-green-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 1.2, duration: 1.5 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating elements */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 bg-white rounded-full p-4 shadow-xl border-2 border-orange-200"
                  >
                    <Heart className="w-6 h-6 text-red-500" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute -bottom-6 -left-6 bg-white rounded-full p-4 shadow-xl border-2 border-green-200"
                  >
                    <Award className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-12"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
                <p className="mt-4 text-xl text-gray-700">
                  Explore the core functionalities designed to enhance welfare management and community support.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    {...scaleOnHover}
                    onClick={() => setCurrentPage(feature.page)}
                  >
                    <div className={`p-6 ${feature.bgColor}`}>
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${feature.color}`}
                      >
                        <feature.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Transforming Military Welfare Services Section */}
        <section id="benefits" className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-12"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 px-4 py-2 text-sm font-semibold rounded-full">
                    Measurable Impact
                  </Badge>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Transforming Military Welfare Services
                </h2>
                <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  Quantifiable improvements in service delivery, accessibility, and community engagement for our
                  armed forces personnel and their families.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                {[
                  {
                    icon: Clock,
                    stat: "70%",
                    title: "Faster Processing",
                    description: "Reduce application processing time significantly",
                    color: "text-orange-500",
                    iconBg: "bg-gradient-to-br from-orange-400 to-green-500",
                  },
                  {
                    icon: Globe,
                    stat: "24/7",
                    title: "24/7 Accessibility",
                    description: "Access welfare services anytime, anywhere",
                    color: "text-green-500",
                    iconBg: "bg-gradient-to-br from-orange-400 to-green-500",
                  },
                  {
                    icon: Users,
                    stat: "50K+",
                    title: "Community Network",
                    description: "Connect with military families nationwide",
                    color: "text-blue-500",
                    iconBg: "bg-gradient-to-br from-orange-400 to-green-500",
                  },
                  {
                    icon: Lock,
                    stat: "100%",
                    title: "Security Compliance",
                    description: "Military-grade security for all transactions",
                    color: "text-purple-500",
                    iconBg: "bg-gradient-to-br from-orange-400 to-green-500",
                  },
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="text-center group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`w-20 h-20 ${metric.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
                    >
                      <metric.icon className="w-10 h-10 text-white" />
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                      className={`text-5xl font-bold ${metric.color} mb-3`}
                    >
                      {metric.stat}
                    </motion.div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {metric.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {metric.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-12"
            >
              <motion.div variants={fadeInUp} className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Testimonials</h2>
                <p className="mt-4 text-xl text-gray-700">
                  Hear from our users about their experiences with the platform.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div key={index} variants={fadeInUp} className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.rank}</p>
                        <p className="text-sm text-gray-600">{testimonial.unit}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-orange-500 to-green-600 relative overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"
          />

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full"
          />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Ready to Transform Military Welfare Management?
              </h2>

              <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                Join thousands of military families who have already simplified their welfare management journey with
                our secure, government-approved digital platform.
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.div {...scaleOnHover}>
                  <Button
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 text-xl font-bold shadow-xl"
                    onClick={() => scrollToSection("features")}
                  >
                    Access Portal Now
                    <Zap className="ml-3 h-6 w-6" />
                  </Button>
                </motion.div>

                <motion.div {...scaleOnHover}>
                  <Button
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 text-xl font-bold shadow-xl"
                    onClick={() => scrollToSection("about")}
                  >
                    Learn More
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-orange-100 text-sm"
              >
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Government Approved Platform
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Military-Grade Security
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  24/7 Technical Support
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-4 gap-8 mb-12"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold">Armed Forces Welfare Portal</span>
                    <p className="text-sm text-gray-400">Government of India</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Empowering military families with comprehensive welfare management solutions through secure digital
                  infrastructure.
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-6 text-lg">Quick Links</h3>
                <ul className="space-y-3 text-gray-400">
                  {[
                    { name: "Home", id: "home" },
                    { name: "Features", id: "features" },
                    { name: "Benefits", id: "benefits" },
                    { name: "About", id: "about" },
                  ].map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="hover:text-white transition-colors hover:text-orange-400"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-6 text-lg">Services</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <button
                      onClick={() => setCurrentPage("welfare-schemes")}
                      className="hover:text-white transition-colors hover:text-orange-400"
                    >
                      Welfare Schemes
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentPage("emergency")}
                      className="hover:text-white transition-colors hover:text-orange-400"
                    >
                      Emergency Support
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentPage("marketplace")}
                      className="hover:text-white transition-colors hover:text-orange-400"
                    >
                      Resource Sharing
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentPage("grievance")}
                      className="hover:text-white transition-colors hover:text-orange-400"
                    >
                      Grievance Portal
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-6 text-lg">Contact Information</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    Ministry of Defence, New Delhi
                  </li>
                  <li className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    1800-XXX-XXXX (Toll Free)
                  </li>
                  <li className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    support@milwelfare.gov.in
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="border-t border-gray-800 pt-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400 text-center md:text-left">
                  &copy; 2024 Armed Forces Welfare Portal, Government of India. All rights reserved.
                </p>
                <div className="flex items-center space-x-6 text-gray-400 text-sm">
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Accessibility
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </footer>

        {/* Tricolor bottom border */}
        <div className="bg-gradient-to-r from-orange-500 via-white to-green-600 h-1"></div>
      </div>
    )
  }

  return renderCurrentPage()
}

export default HomePage
