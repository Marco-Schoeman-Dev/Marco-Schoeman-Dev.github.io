import type { PageProps } from '.'
import { Chunk } from '../components/Chunk'
import { PageHeader } from '../components/PageHeader'
import { Accent } from '../components/Accent'
import { IconArrow } from '../components/Icons'
import { Profile } from '../sections/Profile'
import { ClientWork } from '../sections/ClientWork'
import { Services } from '../sections/Services'
import { Method } from '../sections/Method'
import { Contact } from '../sections/Contact'

export default function Work(_: PageProps) {
  return (
    <>
      <PageHeader
        eyebrow={{ index: '00', name: 'Work' }}
        label="Build it. Break it."
        title={
          <>
            Build it.
            <br />
            <Accent>Break</Accent> it.
          </>
        }
        lead="Websites, AI automations and security testing. I build the thing, then test it the way an attacker would, so you hear about the problems from me first."
      >
        <a href="#contact" className="btn btn-primary">
          Start a project
          <IconArrow width={18} height={18} />
        </a>
        <a href="#client-work" className="btn btn-secondary">
          See client work
        </a>
      </PageHeader>
      <Chunk>
        <Profile index="01" />
      </Chunk>
      <Chunk>
        <ClientWork index="02" />
      </Chunk>
      <Chunk>
        <Services index="03" />
      </Chunk>
      <Chunk>
        <Method index="04" />
      </Chunk>
      <Chunk>
        <Contact index="05" />
      </Chunk>
    </>
  )
}
