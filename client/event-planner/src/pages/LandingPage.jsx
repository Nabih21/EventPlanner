import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaChartBar, FaComments } from 'react-icons/fa';
import { MdEventAvailable, MdSecurity, MdSpeed } from 'react-icons/md';
import { BsArrowRight } from 'react-icons/bs';
import styles from './LandingPage.module.css';

const LandingPage = ({ user }) => {

  console.log("User in LandingPage:", user);
  return (
    <div className={styles.landingContainer}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Smart Education Events System
          </h1>
          <p className={styles.subtitle}>
            Streamline your educational events with our comprehensive management platform
          </p>
          { user == null && (

          <div className={styles.ctaButtons}>
            <Link to="/auth?type=signup" className={styles.primaryButton}>Get Started</Link>
            <Link to="/auth?type=login" className={styles.secondaryButton}>Sign In</Link>
          </div>

          )}

        </div>
        <div className={styles.heroIllustration}>
          <img 
            src="/src/assets/images/hero-illustration.png" 
            alt="Event Planning Illustration" 
            className={styles.heroImage} 
          />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Key Features</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaCalendarAlt className={styles.icon} />
            </div>
            <h3>Event Management</h3>
            <p>Create, manage, and track educational events with ease</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaUsers className={styles.icon} />
            </div>
            <h3>Resource Management</h3>
            <p>Efficiently allocate and manage event resources</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaChartBar className={styles.icon} />
            </div>
            <h3>Analytics & Reporting</h3>
            <p>Get detailed insights into event performance</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaComments className={styles.icon} />
            </div>
            <h3>Engagement Features</h3>
            <p>Interactive tools to boost participant engagement</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <h2 className={styles.sectionTitle}>Why Choose Us</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>
              <MdEventAvailable className={styles.icon} />
            </div>
            <h3>Scalable Solution</h3>
            <p>Handles events of any size with microservices architecture</p>
          </div>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>
              <MdSecurity className={styles.icon} />
            </div>
            <h3>Secure Platform</h3>
            <p>Advanced security measures to protect your data</p>
          </div>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>
              <MdSpeed className={styles.icon} />
            </div>
            <h3>Real-time Updates</h3>
            <p>Stay informed with instant notifications and updates</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What Our Users Say</h2>
        <div className={styles.testimonialGrid}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p>"This platform has revolutionized how we manage our educational events. The analytics features are incredible!"</p>
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>
                <FaUsers className={styles.avatarIcon} />
              </div>
              <div className={styles.authorInfo}>
                <h4>Sarah Johnson</h4>
                <p>Event Coordinator, University of Technology</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p>"The resource management tools have saved us countless hours. Everything is so intuitive and well-designed."</p>
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>
                <FaUsers className={styles.avatarIcon} />
              </div>
              <div className={styles.authorInfo}>
                <h4>Michael Chen</h4>
                <p>Department Head, Global Education Institute</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <p>"The engagement features have significantly increased student participation in our events. Highly recommended!"</p>
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>
                <FaUsers className={styles.avatarIcon} />
              </div>
              <div className={styles.authorInfo}>
                <h4>Emily Rodriguez</h4>
                <p>Student Affairs Director, Innovation Academy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Transform Your Event Management?</h2>
          <p>Join thousands of educational institutions already using our platform</p>
          <Link to="/auth?type=signup" className={styles.ctaButton}>
            Get Started Now <BsArrowRight className={styles.arrowIcon} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 