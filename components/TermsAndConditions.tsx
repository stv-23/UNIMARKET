"use client";

import { useState } from "react";

export default function TermsAndConditions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-primary hover:underline text-sm font-medium"
      >
        Términos y Condiciones
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">
                Términos y Condiciones de Uso
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Última actualización: 25 de noviembre de 2025
              </p>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-foreground">
              <section>
                <h3 className="text-lg font-semibold mb-2">1. Aceptación de los Términos</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Al acceder y utilizar Unimarket, usted acepta estar sujeto a estos Términos y Condiciones.
                  Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestra plataforma.
                  El uso continuado de la plataforma constituye la aceptación de cualquier modificación a estos términos.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">2. Descripción del Servicio</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Unimarket es una plataforma de marketplace universitario que permite a los estudiantes comprar,
                  vender e intercambiar productos y servicios dentro de la comunidad universitaria. La plataforma
                  actúa únicamente como intermediario entre compradores y vendedores.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">3. Registro y Cuenta de Usuario</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Para utilizar ciertas funciones de Unimarket, debe crear una cuenta. Usted se compromete a:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                  <li>Proporcionar información precisa, actual y completa durante el registro</li>
                  <li>Mantener la seguridad de su contraseña y cuenta</li>
                  <li>Notificar inmediatamente cualquier uso no autorizado de su cuenta</li>
                  <li>Ser responsable de todas las actividades que ocurran bajo su cuenta</li>
                  <li>Tener al menos 18 años de edad o contar con el consentimiento de un tutor legal</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">4. Responsabilidades del Usuario</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Al utilizar Unimarket, usted acepta bajo su propia responsabilidad:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                  <li>No publicar contenido ilegal, ofensivo, fraudulento o que infrinja derechos de terceros</li>
                  <li>No utilizar la plataforma para actividades ilegales o no autorizadas</li>
                  <li>Proporcionar descripciones precisas y honestas de los productos que vende</li>
                  <li>Cumplir con todas las leyes y regulaciones aplicables en sus transacciones</li>
                  <li>No suplantar la identidad de otra persona o entidad</li>
                  <li>No interferir con el funcionamiento normal de la plataforma</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">5. Transacciones y Pagos</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Las transacciones entre compradores y vendedores son responsabilidad exclusiva de las partes involucradas.
                  Unimarket no es parte de ninguna transacción y no asume responsabilidad por la calidad, seguridad,
                  legalidad o cualquier otro aspecto de los productos o servicios intercambiados. Los usuarios son
                  responsables de verificar la autenticidad y condición de los productos antes de completar cualquier transacción.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">6. Limitación de Responsabilidad</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  <strong>USTED ACEPTA UTILIZAR UNIMARKET BAJO SU PROPIO RIESGO.</strong> En la máxima medida permitida por la ley:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                  <li>Unimarket no garantiza la exactitud, integridad o utilidad de cualquier información en la plataforma</li>
                  <li>No somos responsables de pérdidas, daños o perjuicios derivados del uso de la plataforma</li>
                  <li>No garantizamos que la plataforma esté libre de errores, virus o componentes dañinos</li>
                  <li>No somos responsables de disputas entre usuarios</li>
                  <li>No garantizamos la disponibilidad continua e ininterrumpida del servicio</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">7. Propiedad Intelectual</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Todo el contenido de Unimarket, incluyendo textos, gráficos, logos, iconos y software, es propiedad
                  de Unimarket o sus licenciantes y está protegido por leyes de propiedad intelectual. Los usuarios
                  conservan los derechos sobre el contenido que publican, pero otorgan a Unimarket una licencia no
                  exclusiva para usar, mostrar y distribuir dicho contenido en la plataforma.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">8. Privacidad y Protección de Datos</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  El uso de su información personal se rige por nuestra Política de Privacidad y Política de Cookies.
                  Al utilizar Unimarket, usted consiente la recopilación y uso de su información según lo descrito
                  en dichas políticas.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">9. Suspensión y Terminación</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nos reservamos el derecho de suspender o terminar su cuenta en cualquier momento, sin previo aviso,
                  si consideramos que ha violado estos términos o si su conducta es perjudicial para otros usuarios
                  o para la plataforma. Usted puede cancelar su cuenta en cualquier momento contactándonos.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">10. Modificaciones a los Términos</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento.
                  Las modificaciones entrarán en vigor inmediatamente después de su publicación en la plataforma.
                  Su uso continuado de Unimarket después de cualquier modificación constituye su aceptación de los
                  nuevos términos.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">11. Ley Aplicable y Jurisdicción</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Estos Términos y Condiciones se rigen por las leyes aplicables en su jurisdicción. Cualquier
                  disputa relacionada con estos términos será resuelta en los tribunales competentes de su localidad.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">12. Contacto</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos a través de la
                  plataforma o enviando un correo electrónico a soporte@unimarket.com
                </p>
              </section>

              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mt-6">
                <p className="text-sm text-destructive font-semibold">
                  ⚠️ AVISO LEGAL IMPORTANTE
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Al aceptar estos términos, usted reconoce que ha leído, entendido y acepta estar legalmente
                  obligado por estos Términos y Condiciones. Usted asume toda la responsabilidad por sus
                  acciones en la plataforma y libera a Unimarket de cualquier responsabilidad derivada del
                  uso del servicio.
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
