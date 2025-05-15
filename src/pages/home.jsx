import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'

const Home = () => {
  const slides = [
    {
      id: 1,
      image: 'https://img.freepik.com/foto-gratis/bodegon-herramientas-medicas_23-2149371263.jpg?semt=ais_hybrid&w=740',
      title: 'Equipos Médicos de Alta Calidad',
      description: 'Tecnología avanzada para el cuidado de la salud',
      cards: [
        {
          icon: 'fas fa-heartbeat',
          title: 'Monitores Vitales',
          description: 'Control preciso de signos vitales'
        },
        {
          icon: 'fas fa-lungs',
          title: 'Equipos Respiratorios',
          description: 'Soluciones para terapia respiratoria'
        }
      ]
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1920',
      title: 'Servicio Profesional',
      description: 'Expertos en equipamiento médico a tu servicio',
      cards: [
        {
          icon: 'fas fa-user-md',
          title: 'Asesoría Especializada',
          description: 'Equipo profesional a tu disposición'
        },
        {
          icon: 'fas fa-tools',
          title: 'Mantenimiento',
          description: 'Servicio técnico certificado'
        }
      ]
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1920',
      title: 'Soluciones Integrales',
      description: 'Todo lo que necesitas para tu práctica médica',
      cards: [
        {
          icon: 'fas fa-hospital',
          title: 'Equipamiento Completo',
          description: 'Soluciones para tu centro médico'
        },
        {
          icon: 'fas fa-truck',
          title: 'Distribución Nacional',
          description: 'Entregas en todo el país'
        }
      ]
    }
  ]

  return (
    <div className="home-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCards]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        loop={true}
        className="main-carousel"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="slide-content">
              <img src={slide.image} alt={slide.title} />
              <div className="slide-overlay">
                <div className="slide-text">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
                <div className="slide-cards">
                  {slide.cards.map((card, index) => (
                    <div key={index} className="info-card">
                      <i className={card.icon}></i>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Home