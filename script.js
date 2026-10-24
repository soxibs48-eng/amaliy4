/**
 * DWEL® Architecture Website Interactions
 * Supports modals, video player, project details, drawer, filtering, and responsive navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Project Database with Specs & Stories
  const projectData = {
    'village-pt': {
      title: 'Village Pt',
      category: 'RETREAT',
      location: 'Aspen, Colorado',
      year: '2024',
      image: 'images/village_pt.png',
      desc: 'Nestled deep in the alpine forests of Aspen, Village Pt explores the juxtaposition between sharp geometric obsidian cladding and warm cedar-lined sanctuaries. The cantilevered structure responds dynamically to seasonal snowfalls while maintaining zero-net-energy performance.',
      area: '480 m²',
      architect: 'Elena Rostova',
      materials: 'Charred Cedar, Black Zinc, Triple Glass',
      status: 'Completed'
    },
    'franklin': {
      title: 'Franklin',
      category: 'WATERFRONT',
      location: 'Miami, Florida',
      year: '2024',
      image: 'images/franklin.png',
      desc: 'Franklin is a waterfront sanctuary designed to harness coastal sea breezes and natural light. Features floating concrete pavilions, bespoke teak sun-louvers, and an infinity reflection pool that merges visually with the surrounding bay waters.',
      area: '620 m²',
      architect: 'Marcus Lindholm',
      materials: 'Poured Concrete, Marine Teak, Low-Iron Glass',
      status: 'Completed'
    },
    'henderson': {
      title: 'Henderson',
      category: 'RESIDENTIAL',
      location: 'Austin, Texas',
      year: '2023',
      image: 'images/henderson.png',
      desc: 'A modernist white-limestone villa organized around an expansive lap pool and landscaped inner courtyards. Henderson balances open entertaining areas with intimate family retreats shaded by mature desert vegetation.',
      area: '540 m²',
      architect: 'Sophia Chen',
      materials: 'White Limestone, Travertine, Steel',
      status: 'Completed'
    },
    'hazelwood': {
      title: 'Hazelwood',
      category: 'RESIDENTIAL',
      location: 'Melbourne, Australia',
      year: '2023',
      image: 'images/hazelwood.png',
      desc: 'Positioned beneath the protective canopy of a century-old eucalyptus tree, Hazelwood utilizes vertical timber battening to modulate private sightlines while illuminating interior concrete living spaces with warm, diffused daylight.',
      area: '390 m²',
      architect: 'Elena Rostova',
      materials: 'Blackened Ironbark, Off-Form Concrete',
      status: 'Completed'
    },
    'martin-st': {
      title: 'Martin St',
      category: 'RETREAT',
      location: 'Palm Springs, California',
      year: '2023',
      image: 'images/martin_st.png',
      desc: 'Constructed on rocky desert terrain among ancient agave, Martin St embraces mid-century desert modernism. Deep roof overhangs shield against midday sun, while brass acoustic ceilings reflect dusk ambient glow.',
      area: '430 m²',
      architect: 'Lukas Meyer',
      materials: 'Rammed Earth, Desert Stone, Brushed Brass',
      status: 'Completed'
    },
    'concord': {
      title: 'Concord',
      category: 'WATERFRONT',
      location: 'Lake Como, Italy',
      year: '2022',
      image: 'images/concord.png',
      desc: 'Set on the slopes of Lake Como, Concord harmonizes tiered historic stone terraces with minimalist steel-framed glass boxes. Features a cliffside plunge pool and a private covered boathouse dock.',
      area: '510 m²',
      architect: 'Matteo Bellini',
      materials: 'Lombardy Granite, Corten Steel, Oak',
      status: 'Completed'
    },
    'houston-st': {
      title: 'Houston St',
      category: 'RESIDENTIAL',
      location: 'Santa Barbara, California',
      year: '2022',
      image: 'images/houston_st.png',
      desc: 'A sun-drenched coastal retreat characterized by a signature turquoise entry portal, clean horizontal rooflines, and continuous terrazzo floors that seamlessly dissolve the divide between interior and outdoor living.',
      area: '380 m²',
      architect: 'Sophia Chen',
      materials: 'Stucco, Ceramic Tiles, Terrazzo',
      status: 'Completed'
    },
    'hillsboro': {
      title: 'Hillsboro',
      category: 'RETREAT',
      location: 'Portland, Oregon',
      year: '2022',
      image: 'images/hillsboro.png',
      desc: 'Perched on a grassy hillside overlooking rolling vineyards, Hillsboro features overlapping cubic volumes clad in dark horizontal siding that frame uninterrupted panoramic horizon lines.',
      area: '460 m²',
      architect: 'Marcus Lindholm',
      materials: 'Charred Pine, Black Aluminum, Douglas Fir',
      status: 'Completed'
    },
    'willow-ave': {
      title: 'Willow Ave',
      category: 'RESIDENTIAL',
      location: 'Seattle, Washington',
      year: '2021',
      image: 'images/willow_ave.png',
      desc: 'An exploration of modular white composite panels and deep geometric reveals. Willow Ave maximizes soft northern daylight while maintaining acoustic privacy in an urban residential setting.',
      area: '320 m²',
      architect: 'Elena Rostova',
      materials: 'Architectural Zinc, Composite Panels, Walnut',
      status: 'Completed'
    },
    'brentwood': {
      title: 'Brentwood',
      category: 'RETREAT',
      location: 'British Columbia, Canada',
      year: '2021',
      image: 'images/brentwood.png',
      desc: 'A multi-level heavy timber residence in the Pacific Northwest mist. Expansive glass balustrades on covered verandas offer protected panoramic views of dense evergreen forests and mountain peaks.',
      area: '590 m²',
      architect: 'Lukas Meyer',
      materials: 'Laminated Timber, Mountain Slate, Glass',
      status: 'Completed'
    }
  };

  // 2. DOM Elements
  const header = document.getElementById('header');
  const projectCards = document.querySelectorAll('.project-card');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Project Modal Elements
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-project-img');
  const modalBadge = document.getElementById('modal-badge');
  const modalYear = document.getElementById('modal-year');
  const modalTitle = document.getElementById('modal-title');
  const modalLocation = document.getElementById('modal-location');
  const modalDesc = document.getElementById('modal-desc');
  const modalArea = document.getElementById('modal-area');
  const modalArchitect = document.getElementById('modal-architect');
  const modalMaterials = document.getElementById('modal-materials');
  const modalStatus = document.getElementById('modal-status');
  const inquireBtn = document.getElementById('inquire-btn');

  // Video Modal Elements
  const playVideoBtn = document.getElementById('play-video-btn');
  const videoModal = document.getElementById('video-modal');
  const videoCloseBtn = document.getElementById('video-close-btn');
  const archVideo = document.getElementById('architecture-video');

  // Info Drawer Elements
  const openInfoBtn = document.getElementById('open-info-btn');
  const infoDrawer = document.getElementById('info-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  // Style Guide Modal Elements
  const linkStyleguide = document.getElementById('link-styleguide');
  const styleguideModal = document.getElementById('styleguide-modal');
  const styleguideCloseBtn = document.getElementById('styleguide-close-btn');

  // Mobile Menu Elements
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  // 3. Sticky Header Effect on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 4. Project Modal Handlers
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const data = projectData[id];
      if (data) {
        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalBadge.textContent = data.category;
        modalYear.textContent = data.year;
        modalTitle.textContent = data.title;
        modalLocation.textContent = data.location;
        modalDesc.textContent = data.desc;
        modalArea.textContent = data.area;
        modalArchitect.textContent = data.architect;
        modalMaterials.textContent = data.materials;
        modalStatus.textContent = data.status;

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeProjectModal = () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtn.addEventListener('click', closeProjectModal);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
  });

  // Inquire button action
  inquireBtn.addEventListener('click', () => {
    alert(`Thank you for your interest in ${modalTitle.textContent}. Our lead architect will contact you within 24 hours.`);
    closeProjectModal();
  });

  // 5. Video Modal Handlers
  playVideoBtn.addEventListener('click', () => {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    archVideo.play().catch(() => {});
  });

  const closeVideoModal = () => {
    videoModal.classList.remove('active');
    archVideo.pause();
    document.body.style.overflow = '';
  };

  videoCloseBtn.addEventListener('click', closeVideoModal);
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  // 6. Info Drawer Handlers
  const openInfoDrawer = () => {
    infoDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
    }
  };

  const closeInfoDrawer = () => {
    infoDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  openInfoBtn.addEventListener('click', openInfoDrawer);
  drawerCloseBtn.addEventListener('click', closeInfoDrawer);
  drawerBackdrop.addEventListener('click', closeInfoDrawer);

  // 7. Style Guide Modal Handlers
  if (linkStyleguide) {
    linkStyleguide.addEventListener('click', (e) => {
      e.preventDefault();
      styleguideModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeStyleguideModal = () => {
    styleguideModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  styleguideCloseBtn.addEventListener('click', closeStyleguideModal);
  styleguideModal.addEventListener('click', (e) => {
    if (e.target === styleguideModal) closeStyleguideModal();
  });

  // 8. Projects Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 9. Mobile Menu Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close menus on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
    }
  });

  // 10. Global Escape Key Listener for Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeVideoModal();
      closeInfoDrawer();
      closeStyleguideModal();
    }
  });
});
