'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ExternalLink, Calendar } from 'lucide-react'
import { Certificate } from '@/types/certificate'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

interface CertificateCardProps {
  certificate: Certificate
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold">{certificate.title}</h3>
              <p className="text-muted-foreground">{certificate.issuer}</p>
            </div>
            <Badge variant="secondary">{certificate.date}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{certificate.description}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Issued: {certificate.date}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {certificate.tags.map((tag: string) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          {certificate.url && (
            <motion.a
              href={certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="h-5 w-5" />
            </motion.a>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
} 