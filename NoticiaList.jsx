import React, { useState, useEffect } from 'react';

const App = () => {
  const supportedLanguages = ['en', 'pt', 'es'];
  const browserLang = navigator.language.split('-')[0];
  const [language, setLanguage] = useState(
    supportedLanguages.includes(browserLang) ? browserLang : 'en'
  );

  const [activeTab, setActiveTab] = useState('updates');
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const translations = {
    en: {
      updates: "Updates / News",
      events: "Events",
      readMore: "Read More",
      enableNotifications: "Enable Notifications",
      disableNotifications: "Disable Notifications",
      noPosts: "No posts available.",
      noEvents: "No upcoming events.",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      switchLang: "Switch Language"
    },
    pt: {
      updates: "Atualizações / Notícias",
      events: "Eventos",
      readMore: "Leia Mais",
      enableNotifications: "Ativar Notificações",
      disableNotifications: "Desativar Notificações",
      noPosts: "Nenhuma postagem disponível.",
      noEvents: "Nenhum evento agendado.",
      darkMode: "Modo Escuro",
      lightMode: "Modo Claro",
      switchLang: "Mudar Idioma"
    },
    es: {
      updates: "Actualizaciones / Noticias",
      events: "Eventos",
      readMore: "Leer Más",
      enableNotifications: "Habilitar Notificaciones",
      disableNotifications: "Deshabilitar Notificaciones",
      noPosts: "No hay publicaciones disponibles.",
      noEvents: "No hay eventos próximos.",
      darkMode: "Modo Oscuro",
      lightMode: "Modo Claro",
      switchLang: "Cambiar Idioma"
    }
  };

  // Tradução automática para conteúdos que vêm como objetos
  const autoTranslate = (textObj) => {
    if (typeof textObj === 'string') return textObj;
    return textObj[language] || textObj['en'] || Object.values(textObj)[0];
  };

  // Simulação de dados carregados (como de uma API)
  useEffect(() => {
    setPosts([
      {
        id: 1,
        title: {
          en: "New Update Released!",
          pt: "Nova Atualização Lançada!",
          es: "¡Nueva Actualización Lanzada!"
        },
        summary: {
          en: "Check out what's new in the latest version.",
          pt: "Confira as novidades na última versão.",
          es: "Descubre lo nuevo en la última versión."
        }
      }
    ]);

    setEvents([
      {
        id: 1,
        title: {
          en: "Online Event This Friday",
          pt: "Evento Online Nesta Sexta",
          es: "Evento Online Este Viernes"
        },
        description: {
          en: "Join us for an exciting online event.",
          pt: "Participe de um evento online emocionante.",
          es: "Únete a un emocionante evento online."
        }
      }
    ]);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'pt' : prev === 'pt' ? 'es' : 'en');
  };

  return (
    <div className={darkMode ? 'app dark' : 'app light'} style={{ padding: '20px' }}>
      <header>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? translations[language].lightMode : translations[language].darkMode}
        </button>
        <button onClick={toggleLanguage}>
          {translations[language].switchLang}
        </button>
        <button onClick={() => {
          // Aqui poderia colocar Notification.requestPermission() se quiser notificações reais
          setNotificationEnabled(!notificationEnabled);
        }}>
          {notificationEnabled
            ? translations[language].disableNotifications
            : translations[language].enableNotifications}
        </button>
      </header>

      <nav>
        <button onClick={() => setActiveTab('updates')}>
          {translations[language].updates}
        </button>
        <button onClick={() => setActiveTab('events')}>
          {translations[language].events}
        </button>
      </nav>

      <main>
        {activeTab === 'updates' && (
          <section>
            {posts.length === 0 ? (
              <p>{translations[language].noPosts}</p>
            ) : (
              posts.map(post => (
                <div key={post.id}>
                  <h2>{autoTranslate(post.title)}</h2>
                  <p>{autoTranslate(post.summary)}</p>
                  <button onClick={() => alert('Abrir post completo (em construção 😅)')}>
                    {translations[language].readMore}
                  </button>
                </div>
              ))
            )}
          </section>
        )}

        {activeTab === 'events' && (
          <section>
            {events.length === 0 ? (
              <p>{translations[language].noEvents}</p>
            ) : (
              events.map(event => (
                <div key={event.id}>
                  <h3>{autoTranslate(event.title)}</h3>
                  <p>{autoTranslate(event.description)}</p>
                </div>
              ))
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default App;