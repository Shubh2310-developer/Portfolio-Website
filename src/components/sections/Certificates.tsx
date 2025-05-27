'use client'

import { motion } from 'framer-motion'
import { CertificateCard } from '@/components/certificates/CertificateCard'
import { certificates } from '@/data/certificates'
import { Certificate } from '@/types/certificate'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function Certificates() {
  // Show only the 3 most recent certificates on the home page
  const recentCertificates = certificates.slice(0, 3)

  return (
    <section id="certificates" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">Internships and Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my professional certifications and Internships that demonstrate my expertise and commitment to continuous learning.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {recentCertificates.map((certificate: Certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <Button asChild variant="outline" size="lg">
            <Link href="/certificates" className="group">
              View All Certificates
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 