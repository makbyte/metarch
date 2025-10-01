'use client'
import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { List, ListItem } from '@/components/List'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageLaptop from '@/images/laptop.jpg'
import imageMeeting from '@/images/meeting.jpg'
import imageWhiteboard from '@/images/whiteboard.jpg'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../lib/firebase'
import { ProductCard } from '@/components/ProductCard'
import LoadingSpinner from '@/components/LoadingSpinner'

function Section({ title, image, children }) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-[var(--bg)] after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[var(--bg)] sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function Discover() {
  return (
    <Section title="Discover" image={{ src: imageWhiteboard }}>
      <div className="space-y-6 text-base text-[var(--bgSofter)]">
        <p>
          We immerse ourselves in your business to understand what{' '}
          <strong className="font-semibold text-[var(--bg)]">truly </strong>{' '}
          drives it. Our goal is to uncover insights that lead to meaningful
          solutions — even if it means going a little... deeper than expected.
        </p>
        <p>
          Our team works side-by-side with yours, analyzing operations, asking
          the{' '}
          <strong className="font-semibold text-[var(--bg)]">
            tough questions
          </strong>{' '}
          , and occasionally rifling through metaphorical trash bins to find
          hidden
        </p>
        <p>
          If necessary, we’ll deploy every tool in{' '}
          <strong className="font-semibold text-[var(--bg)]">
            our arsenal
          </strong>{' '}
          — including charm, spreadsheets, and occasionally, light espionage.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-[var(--bg)]">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>Deep-dive questionnaires</TagListItem>
        <TagListItem>Employee interviews</TagListItem>
        <TagListItem>Feasibility assessments</TagListItem>
        <TagListItem>Market landscape review</TagListItem>
        <TagListItem>Proofs-of-concept</TagListItem>
      </TagList>
    </Section>
  )
}

function Build() {
  return (
    <Section title="Build" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-[var(--bgSofter)]">
        <p>
          Based on deep insights from our discovery phase, we craft a clear,
          intelligent roadmap aligned with your goals and technical vision.
        </p>
        <p>
          Our engineers then build precision-driven systems — combining smart
          automation, seamless forming capabilities, and scalable architecture
          that’s built to perform.
        </p>
      </div>

      <Blockquote
        author={{ name: 'Debra Fiscal', role: 'CEO of Unseal' }}
        className="mt-12"
      >
        Metarch kept us in the loop every step of the way — it felt like working
        with a machine that was built to communicate.
      </Blockquote>
    </Section>
  )
}

function Deliver() {
  return (
    <Section title="Deliver" image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-[var(--bgSofter)]">
        <p>
          We launch with precision, ensuring every machine performs as expected
          — with reliability,{' '}
          <strong className="font-semibold text-[var(--bg)]">speed</strong>, and
          scalability. Even after delivery, we stay connected, continuously
          improving and adapting your systems for future needs.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-[var(--bg)]">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Testing">
          Rigorous QA ensures our machines operate like clockwork. And yes, our
          tests do catch more than just typos.
        </ListItem>
        <ListItem title="Infrastructure">
          We deploy on solid ground — reliable, scalable environments that punch
          well above their weight (and price point).
        </ListItem>
        <ListItem title="Support">
          We stick around — not because we’re clingy, but because we’re
          committed. With deep system knowledge (and yes, those critical API
          keys), you can count on us for the long haul.
        </ListItem>
      </List>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-linear-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro
        eyebrow="Our Product Range Includes"
        title="Balancing innovation with what actually works
"
      >
        <p>
          We aim to stay ahead of the curve by exploring new technologies — but
          sometimes, sticking with that rock-solid legacy system just feels
          right. Innovation is important, but so is shipping on time.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Semi-Automatic Vacuum Forming Machines">
            Ideal for medium-scale production with manual control and
            flexibility.
          </GridListItem>
          <GridListItem
            title="Fully Automatic Vacuum Forming Machines
"
          >
            Designed for high-volume, consistent output with minimal operator
            intervention.
          </GridListItem>
          <GridListItem
            title="Custom Vacuum Forming Solutions
"
          >
            Tailor-made machines developed to suit your specific materials,
            sizes, and applications.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

// export const metadata = {
//   title: 'Our Products',
//   description:
//     ' Our products are designed with purpose — blending innovation with proven solutions to solve real-world challenges. We prioritize  quality, efficiency, and user-centric design to deliver tools that make a difference. Each product is crafted to offer immediate value and long-term impact.',
// }

export default function Process() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          orderBy('createdAt', 'desc'),
        )
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        setProducts(data)
      } catch (error) {
        console.log('Error', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAllProducts()
  }, [])

  return (
    <>
      <PageIntro
        eyebrow="Our Products"
        title=" Vacuum Forming Machines Designed for Performance"
      >
        <p>
          Metarch offers a comprehensive range of vacuum forming machines built
          to meet diverse production needs. Whether you&apos;re working with
          thermoform packaging, automotive interiors, or custom molded
          components, our machines are engineered to deliver high-quality
          results with speed, precision, and repeatability.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        {/* Future sections: Discover / Build / Deliver */}
      </div>

      {loading ? (
        <LoadingSpinner fullPage={false} message="Fetching products..." />
      ) : products?.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 px-8 sm:grid-cols-2">
          {products?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      )}

      <Values />
      <ContactSection />
    </>
  )
}
