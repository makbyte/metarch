import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'

import imageDriesVincent from '@/images/team/dries-vincent.jpg'

import imageLeslieAlexander from '@/images/team/leslie-alexander.jpg'
import imageMichaelFoster from '@/images/team/michael-foster.jpg'

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-[var(--bg)] py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Our Core Values
"
        title="Balance your passion with your passion for life."
        invert
      >
        <p>
          At Metarch, we&apos;re more than a team — we&apos;re a community of
          thinkers, builders, and doers...
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Innovation" invert>
            Always pushing boundaries with smart design and automation
          </GridListItem>
          <GridListItem title="Quality" invert>
            Precision-built machines that stand the test of time
          </GridListItem>
          <GridListItem title="Partnership" invert>
            Long-term relationships with unmatched service and support
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

const team = [
  {
    title: 'Leadership',
    people: [
      {
        name: 'Leslie Alexander',
        role: 'Co-Founder / CEO',
        image: { src: imageLeslieAlexander },
      },
      {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        image: { src: imageMichaelFoster },
      },
      {
        name: 'Dries Vincent',
        role: 'Partner & Business Relations',
        image: { src: imageDriesVincent },
      },
    ],
  },
  // {
  //   title: 'Team',
  //   people: [
  //     {
  //       name: 'Chelsea Hagon',
  //       role: 'Senior Developer',
  //       image: { src: imageChelseaHagon },
  //     },
  //     {
  //       name: 'Emma Dorsey',
  //       role: 'Senior Designer',
  //       image: { src: imageEmmaDorsey },
  //     },
  //     {
  //       name: 'Leonard Krasner',
  //       role: 'VP, User Experience',
  //       image: { src: imageLeonardKrasner },
  //     },
  //     {
  //       name: 'Blake Reid',
  //       role: 'Junior Copywriter',
  //       image: { src: imageBlakeReid },
  //     },
  //     {
  //       name: 'Kathryn Murphy',
  //       role: 'VP, Human Resources',
  //       image: { src: imageKathrynMurphy },
  //     },
  //     {
  //       name: 'Whitney Francis',
  //       role: 'Content Specialist',
  //       image: { src: imageWhitneyFrancis },
  //     },
  //     {
  //       name: 'Jeffrey Webb',
  //       role: 'Account Coordinator',
  //       image: { src: imageJeffreyWebb },
  //     },
  //     {
  //       name: 'Benjamin Russel',
  //       role: 'Senior Developer',
  //       image: { src: imageBenjaminRussel },
  //     },
  //     {
  //       name: 'Angela Fisher',
  //       role: 'Front-end Developer',
  //       image: { src: imageAngelaFisher },
  //     },
  //   ],
  // },
]

function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-[var(--bg)]">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt={person?.name}
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

export const metadata = {
  title: 'About Us',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

export default async function About() {
  return (
    <>
      <PageIntro
        eyebrow="About us"
        title="Driven by Innovation. Built on Precision.
"
      >
        <p>
          At Metarch, we specialize in designing and manufacturing
          state-of-the-art vacuum forming machines that power industries across
          the globe. Founded with a vision to bring intelligent engineering and
          cutting-edge technology together, we have grown into a trusted name
          known for quality, customization, and customer-first service.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Our mission is simple: to deliver smart machines that enable
            seamless forming—making your production more efficient,
            cost-effective, and consistent.
          </p>
          <p>
            With a dedicated team of engineers, designers, and support
            professionals, we work closely with clients to understand their
            unique requirements and provide tailored vacuum forming solutions
            that meet the highest standards of performance and reliability.
          </p>
        </div>
      </PageIntro>
      {/* <Container className="mt-16">
        <StatList>
          <StatListItem value="35" label="Underpaid employees" />
          <StatListItem value="52" label="Placated clients" />
          <StatListItem value="$25M" label="Invoices billed" />
        </StatList>
      </Container> */}

      <Culture />

      <Team />

      <ContactSection />
    </>
  )
}
