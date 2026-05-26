// ═══════════════════════════════════════════════════════════════
//  DS · TEMPLATES — full-page mocks using only DS primitives & patterns
//  Three: Home Agence · Home Épicerie · Article reader
// ═══════════════════════════════════════════════════════════════

// ─── Template 01 · Home Agence ───────────────────────────────
function TplHomeAgence() {
  const stats = [
    { n: '+50', l: 'projets livrés' },
    { n: '03', l: 'apps publiées' },
    { n: '24h', l: '1er retour' },
  ];
  const works = [
    { tag: 'WEB · CASE №01', title: 'Traceo App', body: 'Application mobile DLC pour épiceries fines. Conception, dev, MAJ.', color: DS.color.orange, fg: '#fff' },
    { tag: 'WEB · CASE №02', title: 'Boutique headless', body: 'E-commerce raccordé à la caisse physique. Stack maison.', color: DS.color.blueDeep, fg: '#fff' },
    { tag: 'OPS · CASE №03', title: 'Pipeline marketing', body: 'Newsletter, GMB, social. Tout automatisé. Dashboard unique.', color: DS.color.forest, fg: DS.color.paper },
  ];
  const services = [
    { glyph: '✦', tag: 'WEB', title: 'Sites & e-commerce', body: 'Vitrine ou boutique. Sur-mesure, performant, autonome.' },
    { glyph: '◆', tag: 'APP', title: 'Applications métier', body: 'Outils pensés pour votre quotidien. Conçus avec vous, maintenus par nous.' },
    { glyph: '◐', tag: 'OPS', title: 'Automatisations', body: 'Vos outils reliés, vos données qui circulent seules. Vous récupérez du temps.' },
    { glyph: '★', tag: 'GROWTH', title: 'Marketing digital', body: 'Newsletter, GMB, social, contenu — un plan, des actions, des résultats mesurables.' },
  ];
  const problems = [
    { title: 'Un site qui n\'apporte rien', body: 'Vitrine figée, parcours qui ne convertit pas — un site qui occupe l\'URL sans jouer son rôle.' },
    { title: 'Des outils dispersés', body: 'Caisse, e-commerce, CRM, compta. La même donnée saisie trois fois par jour.' },
    { title: 'Pas de visibilité data', body: 'Vous décidez au feeling. Vous ne savez pas ce qui marche, où mettre l\'effort.' },
    { title: 'Pas d\'équipe digitale', body: 'Personne en interne pour bouger vite. Tout passe par un prestataire à deux semaines.' },
  ];

  return (
    <div className="ds-reset" style={{ background: DS.color.paper, color: DS.color.ink, fontFamily: DS.font.sans }}>
      <Nav variant="agence" mode="light" />

      <HeroAgence
        sub="On conçoit, on développe, on déploie. Web, mobile, automatisation, marketing — pour les marques qui veulent reprendre la main sur leur outil."
        stats={stats}
      />

      {/* Showroom */}
      <section style={{ background: DS.color.paper, padding: '88px 56px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, gap: 32 }}>
          <SectionHead
            eyebrow="§ Showroom · §03"
            title="Trois preuves"
            italic="récentes."
            size="lg"
          />
          <Button variant="secondary" size="md" trailing="→">+12 projets</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {works.map((w, i) => <ShowroomCard key={i} {...w} emphasis={i === 1} />)}
        </div>
      </section>

      {/* Services */}
      <section style={{ background: DS.color.cream, padding: '88px 56px' }}>
        <SectionHead
          eyebrow="§ Pratiques · §04"
          title="Quatre métiers,"
          italic="un seul atelier."
          lead="Pas de sous-traitance, pas d'agence parisienne hors-sol. Chaque projet est fait à la main, en France, par la même équipe."
          size="lg"
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 48 }}>
          {services.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </section>

      {/* Constat */}
      <ConstatBlock
        items={problems}
        lead="Quatre symptômes qui reviennent chez 9 PME sur 10. Le digital n'a pas suivi le rythme du business."
        ctaLabel="Diagnostic gratuit — 30 min"
      />

      {/* CTA */}
      <CtaBlock
        title="On se parle"
        italic="lundi prochain ?"
        lead="30 minutes pour comprendre votre situation, identifier le levier prioritaire, et voir si on peut vous accompagner. Aucun engagement."
        primary="Réserver l'appel"
        secondary="Recevoir une proposition par mail"
      />

      <Footer variant="agence" />
    </div>
  );
}

// ─── Template 02 · Home Épicerie ─────────────────────────────
function TplHomeEpicerie() {
  const services = [
    { glyph: '✦', tag: 'SITE', title: 'Site vitrine ou e-commerce', body: 'Vitrine ou boutique en ligne — pensée pour mettre vos produits en lumière.', tone: 'olive' },
    { glyph: '◆', tag: 'TRACEO', title: 'Application DLC sur mesure', body: 'L\'app qui suit vos dates limite. Conçue avec et pour les épiceries fines.', tone: 'olive' },
    { glyph: '★', tag: 'GROWTH', title: 'Présence locale & GMB', body: 'Avis, photos, posts, Q&R. Votre fiche Google travaille pour vous toute l\'année.', tone: 'olive' },
    { glyph: '◐', tag: 'CONTENT', title: 'Newsletter & réseaux', body: 'Un calendrier éditorial qui parle à vos clients sans devenir un job à plein temps.', tone: 'olive' },
  ];
  const problems = [
    { title: 'Invisible en ligne', body: 'Vos clients premium achètent en ligne. Si on ne vous trouve pas, on va ailleurs.' },
    { title: 'Outils dispersés', body: 'Caisse, e-commerce, compta. Vous jonglez entre des outils qui ne se parlent pas.' },
    { title: 'Tâches chronophages', body: 'Des heures à mettre à jour, copier-coller, ressaisir. Du temps loin du comptoir.' },
    { title: 'Ventes dormantes', body: 'Une base client qu\'on n\'arrive pas à réveiller. Et un GMB sans avis récents.' },
  ];
  const articles = [
    { tag: 'GUIDE · 04', title: '5 leviers pour activer votre LinkedIn d\'épicerie', lead: 'Ce qu\'on a appris en accompagnant 12 épiceries fines sur 6 mois.', date: '15.04.2026', readTime: '8 min', color: DS.color.olive },
    { tag: 'CASE STUDY', title: 'Comment l\'Épicerie Lebon a doublé son CA en ligne', lead: 'Refonte du site, Traceo, automatisation newsletter. Le pas-à-pas.', date: '02.04.2026', readTime: '12 min', color: DS.color.oliveDeep },
    { tag: 'OUTIL', title: 'Traceo · L\'app DLC qui change la donne', lead: 'Présentation de notre app maison, pensée avec les épiceries fines.', date: '20.03.2026', readTime: '5 min', color: DS.color.ink, fg: DS.color.oliveSoft },
  ];

  return (
    <div className="ds-reset" style={{ background: DS.color.paper, color: DS.color.ink, fontFamily: DS.font.sans }}>
      <Nav variant="epicerie" mode="light" />

      <HeroEpicerie
        kicker="Vertical · Épiceries fines"
        sub="On s'occupe de tout le digital pour accompagner votre croissance, afin que vous vous concentriez sur l'essentiel : conseiller, vendre, faire grandir votre épicerie."
      />

      {/* Services */}
      <section style={{ background: DS.color.paper, padding: '88px 56px' }}>
        <SectionHead
          eyebrowTone="olive"
          eyebrow="§ Nos pratiques pour vous · §02"
          title="Quatre métiers,"
          italic="appliqués à votre boutique."
          lead="Chaque outil que nous construisons pour les épiceries fines a été pensé avec elles. Pas de générique, pas de copié-collé d'autres verticales."
          size="lg"
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 48 }}>
          {services.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </section>

      {/* Constat — olive variant */}
      <ConstatBlock
        tone="olive"
        items={problems}
        lead="Ces quatre symptômes reviennent dans 9 épiceries fines sur 10. Ils n'ont pas grand-chose à voir avec votre produit — ils sont juste là où le digital n'a pas suivi."
        ctaLabel="Diagnostic gratuit — 30 min"
      />

      {/* Articles */}
      <section style={{ background: DS.color.cream, padding: '88px 56px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, gap: 32 }}>
          <SectionHead
            eyebrowTone="olive"
            eyebrow="§ Carnet · §05"
            title="Le carnet des"
            italic="épiceries fines."
            size="lg"
          />
          <Button variant="secondary" size="md" trailing="→">Tous les articles</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {articles.map((a, i) => <ArticleCard key={i} {...a} />)}
        </div>
      </section>

      <CtaBlock
        tone="olive"
        title="Et chez vous,"
        italic="ça donne quoi ?"
        lead="Un appel découverte de 30 minutes pour faire un état des lieux du digital de votre épicerie, et voir ce qu'on peut bouger en priorité."
        primary="Réserver l'appel"
        secondary="Télécharger le guide LinkedIn"
      />

      <Footer variant="epicerie" />
    </div>
  );
}

// ─── Template 03 · Article ──────────────────────────────────
function TplArticle() {
  return (
    <div className="ds-reset" style={{ background: DS.color.paper, color: DS.color.ink, fontFamily: DS.font.sans }}>
      <Nav variant="epicerie" mode="light" />

      {/* Article header */}
      <header style={{
        background: DS.color.cream, padding: '64px 56px 72px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 280, height: 280, borderRadius: '50%',
          background: DS.color.olive, opacity: 0.95,
        }} />
        <div style={{ maxWidth: 880, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 28, alignItems: 'center' }}>
            <Badge tone="olive" filled>GUIDE · 04</Badge>
            <Tag>Présence en ligne</Tag>
            <Tag>8 min de lecture</Tag>
          </div>
          <h1 style={{
            fontFamily: DS.font.display, fontSize: 84, fontWeight: 700, color: DS.color.ink,
            lineHeight: 0.9, letterSpacing: '-0.04em', margin: '0 0 20px',
          }}>
            5 leviers pour activer<br />
            <em style={{ fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic', color: DS.color.olive }}>
              votre LinkedIn d'épicerie.
            </em>
          </h1>
          <p style={{ fontSize: 22, lineHeight: 1.5, color: DS.color.inkSoft, marginBottom: 32, maxWidth: 720 }}>
            Ce qu'on a appris en accompagnant 12 épiceries fines sur 6 mois — pourquoi LinkedIn marche pour vous (oui, vraiment), et comment s'y mettre sans devenir un community manager à temps plein.
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            paddingTop: 24, borderTop: `1px solid ${DS.color.line}`,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: DS.color.olive,
              display: 'grid', placeItems: 'center', color: '#fff',
              fontFamily: DS.font.display, fontWeight: 700, fontSize: 16,
            }}>JM</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: DS.color.ink }}>Jean-Marc Faure</div>
              <div style={{ fontFamily: DS.font.mono, fontSize: 11, color: DS.color.inkSoft, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Marketing · 15.04.2026
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured image / placeholder */}
      <div style={{
        background: DS.color.olive, height: 420, position: 'relative',
        backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 8px, transparent 8px 24px)`,
      }}>
        <Tag style={{
          position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.3)', color: '#fff', border: 'none',
        }}>[ illustration · panel LinkedIn ]</Tag>
      </div>

      {/* Article body */}
      <article style={{ background: DS.color.paper, padding: '72px 56px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontSize: 20, lineHeight: 1.55, color: DS.color.ink, fontWeight: 500, marginBottom: 32 }}>
            Si vous êtes propriétaire d'une épicerie fine, vous avez sans doute déjà entendu : <em style={{ fontFamily: DS.font.serif, color: DS.color.olive }}>« LinkedIn, c'est pour les commerciaux ».</em> C'est faux. Voici pourquoi — et comment en faire votre meilleur canal d'acquisition B2B.
          </p>

          <h2 style={{
            fontFamily: DS.font.display, fontSize: 36, fontWeight: 700, color: DS.color.ink,
            lineHeight: 1.1, letterSpacing: '-0.02em', margin: '48px 0 16px',
          }}>
            01 — <em style={{ fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic', color: DS.color.olive }}>Le mythe</em> du « pas pour moi ».
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: DS.color.ink, marginBottom: 16 }}>
            LinkedIn n'est plus la plateforme des cadres en col blanc. Les acheteurs hôteliers, les chefs étoilés, les CSE qui cherchent des cadeaux clients, les marques qui veulent un food gift de qualité — ils sont tous là. Et ils achètent.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: DS.color.ink, marginBottom: 32 }}>
            Une épicerie de Lyon que nous accompagnons a généré <strong>34 000 € de CA B2B</strong> en 4 mois, depuis trois posts par semaine.
          </p>

          {/* Pull quote */}
          <blockquote style={{
            margin: '40px 0', padding: '32px 36px',
            background: DS.color.cream, borderRadius: DS.radius.lg,
            borderLeft: `4px solid ${DS.color.olive}`,
          }}>
            <p style={{
              fontFamily: DS.font.serif, fontStyle: 'italic', fontWeight: 400, fontSize: 28,
              lineHeight: 1.3, color: DS.color.ink, margin: 0,
            }}>
              « Tu ne vends pas du fromage. Tu vends de la transmission, du savoir-faire, de la curation. Ce sont des sujets de post, pas des produits. »
            </p>
            <footer style={{
              marginTop: 14, fontFamily: DS.font.mono, fontSize: 11,
              color: DS.color.inkSoft, letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              — Marie Lebon, Épicerie Lebon Lyon
            </footer>
          </blockquote>

          <h2 style={{
            fontFamily: DS.font.display, fontSize: 36, fontWeight: 700, color: DS.color.ink,
            lineHeight: 1.1, letterSpacing: '-0.02em', margin: '48px 0 16px',
          }}>
            02 — <em style={{ fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic', color: DS.color.olive }}>Trois piliers</em> de contenu.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: DS.color.ink, marginBottom: 24 }}>
            Inutile de poster tous les jours. Il faut poster <em>juste</em>. Voilà la structure que nous donnons à nos clients :
          </p>
          <ol style={{
            listStyle: 'none', padding: 0, margin: '0 0 32px',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            {[
              { n: '1', t: 'L\'histoire produit', body: 'Le fromager qui livre, la maison qui fabrique, la fermentation qu\'on attend 18 mois. C\'est ce que personne d\'autre n\'a.' },
              { n: '2', t: 'L\'éducation', body: 'Comment on choisit un poivre, ce qui distingue un huile d\'olive du sud-Liban d\'une du nord. Vous savez, eux pas.' },
              { n: '3', t: 'La preuve sociale', body: 'Une commande de 800€ pour un CSE, un repas en cave avec un caviste, un avis client touchant.' },
            ].map(item => (
              <li key={item.n} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 16, alignItems: 'baseline' }}>
                <div style={{
                  fontFamily: DS.font.serif, fontStyle: 'italic', fontSize: 36, fontWeight: 400, color: DS.color.olive,
                  lineHeight: 1,
                }}>{item.n}</div>
                <div>
                  <strong style={{ fontFamily: DS.font.display, fontSize: 19, fontWeight: 700, color: DS.color.ink, letterSpacing: '-0.01em' }}>{item.t}</strong>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: DS.color.inkSoft, marginTop: 4 }}>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p style={{ fontSize: 17, lineHeight: 1.65, color: DS.color.ink, marginBottom: 16 }}>
            Trois posts par semaine, un par pilier. C'est tout. Le reste, c'est de la discipline éditoriale.
          </p>
        </div>
      </article>

      {/* Inline CTA */}
      <section style={{ background: DS.color.cream, padding: '48px 56px' }}>
        <div style={{
          maxWidth: 720, margin: '0 auto',
          padding: '32px 36px', background: DS.color.paper,
          border: `1px solid ${DS.color.line}`, borderRadius: DS.radius.xl,
          display: 'flex', gap: 32, alignItems: 'center',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: DS.radius.md,
            background: DS.color.olive, color: '#fff',
            display: 'grid', placeItems: 'center',
            fontFamily: DS.font.serif, fontStyle: 'italic', fontSize: 36,
          }}>★</div>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: DS.font.display, fontSize: 22, fontWeight: 700, color: DS.color.ink,
              lineHeight: 1.2, letterSpacing: '-0.015em', marginBottom: 6,
            }}>Le guide complet, en PDF</h3>
            <p style={{ fontSize: 14.5, color: DS.color.inkSoft, lineHeight: 1.5 }}>
              32 pages, 5 leviers détaillés, 18 templates de post prêts à copier-coller.
            </p>
          </div>
          <Button variant="accent" tone="olive" size="md" trailing="→">Télécharger</Button>
        </div>
      </section>

      {/* Related */}
      <section style={{ background: DS.color.paper, padding: '88px 56px' }}>
        <SectionHead
          eyebrowTone="olive"
          eyebrow="§ Pour aller plus loin"
          title="Trois autres"
          italic="lectures."
          size="md"
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 32 }}>
          {[
            { tag: 'CASE STUDY', title: 'Lebon Lyon · ×2 en 4 mois', lead: 'Le pas-à-pas, métriques à l\'appui.', date: '02.04.2026', readTime: '12 min', color: DS.color.oliveDeep },
            { tag: 'OUTIL', title: 'Traceo · L\'app DLC', lead: 'L\'outil métier qu\'on a construit avec vous.', date: '20.03.2026', readTime: '5 min', color: DS.color.ink, fg: DS.color.oliveSoft },
            { tag: 'GUIDE · 03', title: 'GMB pour épiceries fines', lead: 'Le canal qui rapporte 0 euro par mois… s\'il dort.', date: '12.03.2026', readTime: '6 min', color: DS.color.olive },
          ].map((a, i) => <ArticleCard key={i} {...a} />)}
        </div>
      </section>

      <Footer variant="epicerie" />
    </div>
  );
}

Object.assign(window, { TplHomeAgence, TplHomeEpicerie, TplArticle });
