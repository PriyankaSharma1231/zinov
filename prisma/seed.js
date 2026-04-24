// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@zinov.com' },
    update: {},
    create: {
      email: 'admin@zinov.com',
      name: 'Admin',
      password: adminPassword,
      role: 'admin',
    },
  })

  // Seed products
  const products = [
    {
      name: 'The Quiet Linen Shirt',
      nameHi: 'शांत लिनन शर्ट',
      description: 'Hand-loomed linen from Kutch, Gujarat. Breathable, timeless, and made to last decades.',
      descriptionHi: 'कच्छ, गुजरात से हाथ से बुनी लिनन। सांस लेने योग्य, कालातीत और दशकों तक चलने के लिए बनाई गई।',
      price: 89,
      image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80',
      category: 'Tops',
      stock: 45,
    },
    {
      name: 'Indigo Wide Trousers',
      nameHi: 'इंडिगो वाइड ट्राउज़र्स',
      description: 'Natural indigo dyed cotton. Easy, elegant, and deeply rooted in Indian craft tradition.',
      descriptionHi: 'प्राकृतिक इंडिगो रंगा हुआ कॉटन। आसान, सुरुचिपूर्ण और भारतीय शिल्प परंपरा में गहराई से निहित।',
      price: 115,
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
      category: 'Bottoms',
      stock: 30,
    },
    {
      name: 'The Still Kurta',
      nameHi: 'द स्टिल कुर्ता',
      description: 'A reimagined kurta for modern London. Minimal cuts, heritage cotton, zero compromise.',
      descriptionHi: 'आधुनिक लंदन के लिए एक पुनर्कल्पित कुर्ता। न्यूनतम कट, विरासत कॉटन, शून्य समझौता।',
      price: 95,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
      category: 'Tops',
      stock: 60,
    },
    {
      name: 'Raw Silk Jacket',
      nameHi: 'रॉ सिल्क जैकेट',
      description: 'Woven in Varanasi. Structured shoulders, unlined, meant to be worn over everything.',
      descriptionHi: 'वाराणसी में बुनी गई। संरचित कंधे, बिना अस्तर के, हर चीज़ के ऊपर पहनने के लिए।',
      price: 195,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
      category: 'Outerwear',
      stock: 20,
    },
    {
      name: 'Handblock Scarf',
      nameHi: 'हैंडब्लॉक स्कार्फ',
      description: 'Block-printed in Jaipur using natural dyes. Every piece is unique by hand.',
      descriptionHi: 'जयपुर में प्राकृतिक रंगों से ब्लॉक-प्रिंटेड। हर टुकड़ा हाथ से अनोखा है।',
      price: 55,
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80',
      category: 'Accessories',
      stock: 80,
    },
    {
      name: 'Minimal Cotton Dress',
      nameHi: 'मिनिमल कॉटन ड्रेस',
      description: 'Organic Rajasthani cotton. Clean silhouette, deep pockets, effortlessly wearable.',
      descriptionHi: 'जैविक राजस्थानी कॉटन। साफ सिल्हूट, गहरी जेबें, आसानी से पहनने योग्य।',
      price: 135,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
      category: 'Dresses',
      stock: 35,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.name },
      update: {},
      create: product,
    })
  }

  // Seed some dummy analytics
  const pages = ['/', '/shop', '/about', '/contact']
  for (let i = 0; i < 120; i++) {
    await prisma.pageView.create({
      data: {
        page: pages[Math.floor(Math.random() * pages.length)],
        country: ['UK', 'India', 'USA', 'Germany', 'Canada'][Math.floor(Math.random() * 5)],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      },
    })
  }

  console.log('✅ Seed complete!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
