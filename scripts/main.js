const particleconfig = {
  particles: {
    number: {
      value: 55,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#ffffff',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse',
      },
      onclick: {
        enable: false,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 2,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};
particlesJS('particlejs', particleconfig);

const toggleElementButtons = function (elem) {
  if (elem.id == 'name') {
    return;
  } else if (elem.classList.contains('social')) {
    return;
  } else {
    let actives = document.querySelectorAll('.active');
    actives.forEach((a) => {
      a.classList.remove('active');
    });
    elem.classList.add('active');
    switch (elem.id) {
      case 'aboutmebutton':
        document.getElementById('aboutme').classList.add('active');
        break;
      case 'resumebutton':
        document.getElementById('resume').classList.add('active');
        break;
      case 'projectsbutton':
        document.getElementById('projects').classList.add('active');
        break;
      case 'contactbutton':
        document.getElementById('contact').classList.add('active');
        break;
      default:
        document.getElementById('aboutme').classList.add('active');
        document.getElementById('aboutmebutton').classList.add('active');
        break;
    }
  }
};

$('a').click(function () {
  toggleElementButtons(this);
});
