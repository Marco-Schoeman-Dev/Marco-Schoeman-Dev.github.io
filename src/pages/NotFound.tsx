import type { PageProps } from '.'
import { PageHeader } from '../components/PageHeader'
import { Accent } from '../components/Accent'

export default function NotFound(_: PageProps) {
  return (
    <PageHeader
      eyebrow={{ index: '404', name: 'Not found' }}
      label="Nothing here."
      title={
        <>
          Nothing <Accent>here</Accent>.
        </>
      }
      lead="This page does not exist. Possibly it never did. Either way, it is not coming back."
    >
      <a href="/" className="btn btn-primary">
        Go home
      </a>
      <a href="/lives" className="btn btn-secondary">
        Read the Lives
      </a>
    </PageHeader>
  )
}
