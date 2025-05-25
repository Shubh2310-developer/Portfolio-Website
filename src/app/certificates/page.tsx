'use client'

import { motion } from 'framer-motion'
import { CertificateCard } from '@/components/certificates/CertificateCard'
import { certificates } from '@/data/certificates'
import { Certificate } from '@/types/certificate'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function CertificatesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Certificates & Achievements</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A collection of my professional certifications and achievements that showcase my expertise and continuous learning journey.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {certificates.map((certificate: Certificate) => (
          <CertificateCard key={certificate.id} certificate={certificate} />
        ))}
      </motion.div>
    </div>
  )
} 