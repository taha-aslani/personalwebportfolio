particlesJS('particlejs', {
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
});

// the function that handle header buttons functional
const toggleElementButtons = function (elem) {
  if (elem.id == 'name') {
    return;
  } else if (elem.classList.contains('social')) {
    return;
  } else {
    let actives = document.querySelectorAll('.active');
    actives.forEach((active) => {
      active.classList.remove('active');
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

const form = document.getElementById('contact-form');

// added an event to all 'a' tags to listen clicks and call the above function
document.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    toggleElementButtons(this);
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const STORAGE_KEY = 'contact_form_submissions';
  const submissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const now = Date.now();

  const recentSubmissions = submissions.filter(
    (time) => now - time < 60 * 60 * 1000
  );

  if (recentSubmissions.length >= 2) {
    Swal.fire({
      icon: 'error',
      title: 'زشته نکن...',
      text: 'تو یک ساعت گذشته 2 بار پیام فرستادی یکم صبر کن...',
    });
    return;
  }
  grecaptcha.ready(function () {
    grecaptcha
      .execute('6LfEIO0qAAAAAG2aI25B01I1kZf4P7mxTz3Lawn_', { action: 'submit' })
      .then(function (token) {
        const formData = {
          name: document.getElementById('contact_input').value.trim(),
          email: document.getElementById('email_input').value.trim(),
          message: document.getElementById('textarea_input').value.trim(),
          'g-recaptcha-token': token,
        };
        fetch('http://tahaaslaniback.liara.run:3000/api/contact', {
          method: 'POST',
          body: formData,
        })
          .then((res) => {
            if (res.ok) {
              Swal.fire({
                icon: 'success',
                title: 'پیامت رفت...',
                text: 'پیامت رو با موفقیت فرستادی، از طرف من هم یه ایمیل دریافت کردی!',
              });
              recentSubmissions.push(now);
              localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(recentSubmissions)
              );
              return;
            } else {
              return res.json();
            }
          })
          .then((json) => {
            if (typeof json !== 'object') return;
            if (+json.message.status === 429) {
              return Swal.fire({
                icon: 'error',
                title: 'بد شد',
                text: 'پس حاکر هم هستی ها؟!!',
              });
            }
            Swal.fire({
              icon: 'error',
              title: 'اوپس...',
              text: 'یه مشکلی پیش اومد...',
            });
          })
          .catch((e) => {
            Swal.fire({
              icon: 'error',
              title: 'اوپس...',
              text: 'یه مشکلی پیش اومد...',
            });
          });
      });
  });
});
