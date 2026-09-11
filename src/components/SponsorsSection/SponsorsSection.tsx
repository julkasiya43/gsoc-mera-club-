import './SponsorsSection.css';

const sponsors = [
  { name: 'Ascent Hive', logo: '/Sponsors/ascent_hive_logo.avif' },
  { name: 'Code Crafters', logo: '/Sponsors/code_crafters_logo.avif' },
  { name: 'Denovate', logo: '/Sponsors/denovate_logo.avif' },
  { name: 'Fueler', logo: '/Sponsors/fueler_logo.avif' },
  { name: 'Genesis', logo: '/Sponsors/genesis_logo.avif' },
  { name: 'Give My Certificate', logo: '/Sponsors/give_my_certificate_logo.avif' },
  { name: 'HackIndia', logo: '/Sponsors/hackindia_logo.avif' },
  { name: 'HackWithIndia', logo: '/Sponsors/hackwithindia_logo.avif' },
  { name: 'Hulchul', logo: '/Sponsors/hulchul_logo.avif' },
  { name: 'Insforge', logo: '/Sponsors/insforge_logo.avif' },
  { name: 'Insights', logo: '/Sponsors/insights_logo.avif' },
  { name: 'Keploy', logo: '/Sponsors/keploy_logo.avif' },
  { name: 'n8n', logo: '/Sponsors/n8n_logo.avif' },
  { name: 'Navan AI', logo: '/Sponsors/navan_ai_logo.avif' },
  { name: 'Nirvaha', logo: '/Sponsors/nirvaha_logo.avif' },
  { name: 'OSCode', logo: '/Sponsors/oscode_logo.avif' },
  { name: 'OSEN', logo: '/Sponsors/osen_logo.png' },
  { name: 'Render', logo: '/Sponsors/render_logo.avif' },
  { name: 'She Kunj', logo: '/Sponsors/she_kunj_logo.avif' },
  { name: 'U-Matt', logo: '/Sponsors/u_matt_logo.png' },
  { name: 'UseQR', logo: '/Sponsors/useqr_logo.avif' },
  { name: 'Vistaar', logo: '/Sponsors/vistaar_logo.png' },
  { name: 'Wholy', logo: '/Sponsors/wholy_logo.png' },
  { name: 'XYZ', logo: '/Sponsors/xyz_logo.png' },
];

export function SponsorsSection() {
  return (
    <section className="sponsors-section" aria-label="Our Sponsors">
      <div className="sponsors-header">
        <p className="sponsors-eyebrow">Trusted By</p>
        <h2 className="sponsors-title">
          Our <span className="sponsors-highlight">Sponsors</span> &amp; Partners
        </h2>
        <p className="sponsors-subtitle">
          Backed by industry leaders who believe in the power of open source and innovation.
        </p>
      </div>

      <div className="sponsors-marquee-wrapper" aria-hidden="true">
        {/* Fade edges */}
        <div className="sponsors-fade sponsors-fade--left" />
        <div className="sponsors-fade sponsors-fade--right" />

        {/* First track */}
        <div className="sponsors-marquee">
          <div className="sponsors-track">
            {/* Duplicate the list twice so the loop is seamless */}
            {[...sponsors, ...sponsors].map((sponsor, i) => (
              <div className="sponsor-card" key={`${sponsor.name}-${i}`}>
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="sponsor-logo"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second track (reverse direction for depth) */}
        <div className="sponsors-marquee sponsors-marquee--reverse">
          <div className="sponsors-track">
            {[...sponsors, ...sponsors].map((sponsor, i) => (
              <div className="sponsor-card" key={`rev-${sponsor.name}-${i}`}>
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="sponsor-logo"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
