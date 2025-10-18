'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { certificates } from '@/data/certificates'
import { Certificate } from '@/types/certificate'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Award, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

interface CertificateSlideProps {
  certificate: Certificate
  isActive: boolean
}

function CertificateSlide({ certificate, isActive }: CertificateSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.5 }}
      className="relative min-w-full px-4"
    >
      <div className="glass rounded-3xl p-8 relative overflow-hidden holographic-glow group">
        {/* Holographic sweep effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          {/* Left side - Icon and badge */}
          <div className="flex-shrink-0">
            <motion.div
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Award className="w-12 h-12 text-primary" />
            </motion.div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                {certificate.title}
              </h3>
              <p className="text-lg text-muted-foreground">{certificate.issuer}</p>
              <p className="text-sm text-muted-foreground/70">{certificate.date}</p>
            </div>

            {certificate.description && (
              <p className="text-muted-foreground leading-relaxed">
                {certificate.description}
              </p>
            )}

            {/* Tags */}
            {certificate.tags && (
              <div className="flex flex-wrap gap-2">
                {certificate.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/30 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* View certificate link */}
            {certificate.pdf && (
              <motion.a
                href={certificate.pdf}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors group/link"
              >
                <ExternalLink className="w-4 h-4 group-hover/link:rotate-12 transition-transform" />
                <span className="text-sm font-medium">View Certificate</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Glowing border effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}

export function Certificates() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  const recentCertificates = certificates.slice(0, 3)

  return (
    <section id="certificates" className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0f172a] to-background opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                Certifications & Internships
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Continuous learning and professional growth in AI and software engineering
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {recentCertificates.map((certificate, index) => (
                  <CertificateSlide
                    key={certificate.id}
                    certificate={certificate}
                    isActive={index === selectedIndex}
                  />
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <motion.button
                onClick={scrollPrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full glass border border-primary/30 hover:border-accent hover:bg-accent/10 transition-colors"
                aria-label="Previous certificate"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </motion.button>

              {/* Dots indicator */}
              <div className="flex gap-2">
                {recentCertificates.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === selectedIndex
                        ? 'w-8 bg-accent'
                        : 'w-2 bg-muted-foreground/30'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    aria-label={`Go to certificate ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={scrollNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full glass border border-primary/30 hover:border-accent hover:bg-accent/10 transition-colors"
                aria-label="Next certificate"
              >
                <ChevronRight className="w-6 h-6 text-primary" />
              </motion.button>
            </div>
          </div>

          {/* View all button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-heading glow-on-hover group">
                <Link href="/certificates" className="flex items-center gap-2">
                  View All Certificates
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 