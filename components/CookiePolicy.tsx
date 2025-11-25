"use client";

import { useState } from "react";

export default function CookiePolicy() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-primary hover:underline text-sm font-medium"
      >
        Política de Cookies
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">
                Política de Cookies
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Última actualización: 25 de noviembre de 2025
              </p>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-foreground">
              <section>
                <h3 className="text-lg font-semibold mb-2">¿Qué son las Cookies?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita
                  un sitio web. Estas cookies permiten que el sitio web recuerde sus acciones y preferencias
                  durante un período de tiempo, por lo que no tiene que volver a configurarlas cada vez que
                  regresa al sitio o navega de una página a otra.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">¿Cómo Utilizamos las Cookies?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Unimarket utiliza cookies para mejorar su experiencia en nuestra plataforma, mantener su
                  sesión segura y proporcionar funcionalidades personalizadas. Al aceptar esta política,
                  usted consiente el uso de cookies según se describe a continuación.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Tipos de Cookies que Utilizamos</h3>
                
                <div className="space-y-4 mt-3">
                  <div className="bg-input/50 border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">🔐 Cookies Esenciales (Necesarias)</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Estas cookies son estrictamente necesarias para el funcionamiento de la plataforma.
                      Incluyen cookies de autenticación que mantienen su sesión activa y segura, permitiéndole
                      acceder a su cuenta y realizar transacciones. Sin estas cookies, no podríamos proporcionar
                      servicios básicos de la plataforma.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Ejemplos:</strong> Tokens de sesión, tokens JWT, cookies de autenticación
                    </p>
                  </div>

                  <div className="bg-input/50 border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">⚙️ Cookies de Funcionalidad</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Estas cookies permiten que la plataforma recuerde sus preferencias y elecciones
                      (como su nombre de usuario, idioma o región) para proporcionar una experiencia más
                      personalizada y mejorada. También pueden utilizarse para recordar cambios que haya
                      realizado en el tamaño del texto, fuentes y otras partes personalizables de la web.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Ejemplos:</strong> Preferencias de tema, configuración de idioma, filtros guardados
                    </p>
                  </div>

                  <div className="bg-input/50 border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">📊 Cookies de Rendimiento y Analíticas</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Estas cookies recopilan información sobre cómo los visitantes utilizan nuestra plataforma,
                      como qué páginas visitan con más frecuencia y si reciben mensajes de error. Toda la
                      información que recopilan estas cookies es agregada y anónima. Solo se utiliza para
                      mejorar el funcionamiento de la plataforma.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Ejemplos:</strong> Google Analytics, métricas de uso, análisis de comportamiento
                    </p>
                  </div>

                  <div className="bg-input/50 border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">🎯 Cookies de Seguridad</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Estas cookies ayudan a proteger su cuenta y datos personales. Se utilizan para detectar
                      actividades sospechosas, prevenir fraudes y garantizar que solo usted pueda acceder a
                      su cuenta. También ayudan a proteger contra ataques de seguridad como CSRF (Cross-Site
                      Request Forgery).
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Ejemplos:</strong> Tokens CSRF, cookies de verificación, cookies anti-fraude
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Duración de las Cookies</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Las cookies que utilizamos pueden ser:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                  <li><strong>Cookies de sesión:</strong> Se eliminan automáticamente cuando cierra su navegador</li>
                  <li><strong>Cookies persistentes:</strong> Permanecen en su dispositivo durante un período específico o hasta que las elimine manualmente</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Cookies de Terceros</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  En algunos casos, utilizamos cookies proporcionadas por terceros de confianza. Estas pueden
                  incluir servicios de análisis, procesamiento de pagos o servicios de almacenamiento en la nube.
                  Estos terceros tienen sus propias políticas de privacidad y no tenemos acceso ni control sobre
                  estas cookies.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Sus Derechos y Opciones</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Usted tiene derecho a:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                  <li>Aceptar o rechazar cookies (excepto las estrictamente necesarias)</li>
                  <li>Eliminar cookies almacenadas en su dispositivo en cualquier momento</li>
                  <li>Configurar su navegador para bloquear cookies</li>
                  <li>Solicitar información sobre las cookies que utilizamos</li>
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  Tenga en cuenta que bloquear o eliminar cookies puede afectar la funcionalidad de la plataforma
                  y algunas características pueden no estar disponibles.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Cómo Controlar las Cookies</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Puede controlar y/o eliminar cookies como desee. Puede eliminar todas las cookies que ya están
                  en su dispositivo y puede configurar la mayoría de los navegadores para evitar que se coloquen.
                  Sin embargo, si hace esto, es posible que tenga que ajustar manualmente algunas preferencias
                  cada vez que visite un sitio y algunos servicios y funcionalidades pueden no funcionar.
                </p>
                <div className="bg-input/50 border border-border rounded-lg p-3 mt-3">
                  <p className="text-xs text-muted-foreground">
                    <strong>Configuración del navegador:</strong> La mayoría de los navegadores web permiten
                    controlar las cookies a través de la configuración. Consulte la sección de ayuda de su
                    navegador para obtener más información.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Actualizaciones de esta Política</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en nuestras
                  prácticas o por otras razones operativas, legales o reglamentarias. Le recomendamos que revise
                  esta política regularmente para mantenerse informado sobre cómo utilizamos las cookies.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Contacto</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Si tiene preguntas sobre nuestra Política de Cookies, puede contactarnos a través de
                  soporte@unimarket.com
                </p>
              </section>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-6">
                <p className="text-sm text-primary font-semibold">
                  ℹ️ Consentimiento
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Al aceptar esta Política de Cookies, usted consiente el uso de cookies según se describe
                  en este documento. Usted puede retirar su consentimiento en cualquier momento modificando
                  la configuración de su navegador o contactándonos directamente.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-border">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-primary text-primary-foreground p-3 rounded-lg hover:bg-blue-600 transition-all shadow-lg font-bold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
