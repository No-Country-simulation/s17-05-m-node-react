import React from 'react';
import Header from '../common/Header';
const secciones = [
    { id: "introduccion", texto: "Introducción", link: "#introduccion" },
    { id: "vision-mision", texto: "Visión y Misión", link: "#vision-mision" },
    { id: "soluciones", texto: "Soluciones AgroSmart", link: "#soluciones" },
    { id: "beneficios", texto: "Beneficios para los Pequeños Productores", link: "#beneficios" },
    { id: "impacto", texto: "Impacto en la Comunidad", link: "#impacto" },
    { id: "conclusion", texto: "Conclusión", link: "#conclusion" }
];

const AgroSmart: React.FC = () => {
    return (
        <>
            <Header />
            <div className="p-6 bg-tumbo text-gray-800">
                {/* Navegación de anclas */}
                <nav className="mb-4">
                    <ul className="list-disc pl-6 space-y-2">
                        {
                            secciones.map(({ link, texto, id }) => {
                                return <li key={id}><a href={link} className="text-blue-500 hover:underline">{texto}</a></li>
                            })
                        }
                    </ul>
                </nav>

                {/* Introducción */}
                <section id="introduccion" className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Introducción</h2>
                    <p>
                        AgroSmart es una empresa innovadora con sede en Argentina, dedicada a revolucionar la forma en que los pequeños productores agrícolas gestionan sus cultivos teniendo en cuenta varios parámetros para optimizar los mismos. Nos especializamos en soluciones de agricultura inteligente, utilizando tecnología avanzada para acompañar al productor cada etapa del proceso productivo, desde la siembra hasta la cosecha minimizando las fallas y potenciando las ubicaciones y climas, entre otras cosas.
                    </p>
                </section>

                {/* Visión y Misión */}
                <section id="vision-mision" className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Visión y Misión</h2>
                    <h3 className="text-xl font-semibold">Visión</h3>
                    <p> Ser la empresa líder en agricultura inteligente para pequeños productores en Argentina, ayudándolos a maximizar su productividad de manera sostenible y rentable.</p>
                    <h3 className="text-xl font-semibold mt-4">Misión</h3>
                    <p> Proveer herramientas y conocimientos de vanguardia a pequeños productores para mejorar la eficiencia, reducir costos y minimizar el impacto ambiental de sus actividades agrícolas.</p>
                </section>

                {/* Soluciones AgroSmart */}
                <section id="soluciones" className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Soluciones AgroSmart</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Recomendaciones basadas en datos para optimizar el uso de recursos como el agua y los fertilizantes.</li>
                        <li>Alertas tempranas sobre posibles plagas y enfermedades para cuidar sus cultivos.</li>
                        <li>Registro digital de actividades agrícolas.</li>
                        <li>Análisis predictivo para mejorar la toma de decisiones.</li>
                    </ul>
                </section>

                {/* Beneficios para los Pequeños Productores */}
                <section id="beneficios" className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Beneficios para los Pequeños Productores</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><b>Aumento de la Productividad:</b> Uso eficiente de recursos y reducción de desperdicios.</li>
                        <li><b>Mejora en la toma de Decisiones:</b> Información precisa y oportuna para maximizar rendimientos.</li>
                        <li><b>Sostenibilidad:</b> Prácticas agrícolas que protegen el medio ambiente.</li>
                        <li><b>Accesibilidad:</b> Soluciones asequibles y fáciles de implementar.</li>
                    </ul>
                </section>

                {/* Impacto en la Comunidad */}
                <section id="impacto" className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Impacto en la Comunidad</h2>
                    <p>AgroSmart no solo busca mejorar la eficiencia de los pequeños productores, sino también contribuir al desarrollo de las comunidades rurales en Argentina. Al potenciar a los agricultores con tecnología inteligente, fomentamos la creación de empleos, la seguridad alimentaria y la resiliencia frente a los desafíos climáticos.
                    </p>
                </section>

                {/* Conclusión */}
                <section id="conclusion">
                    <h2 className="text-2xl font-bold mb-4">Conclusión</h2>
                    <p>En AgroSmart, creemos que la tecnología es la clave para un futuro agrícola más próspero y sostenible. Nos comprometemos a apoyar a los pequeños productores de Argentina en su camino hacia una agricultura más inteligente, eficiente y sostenible.</p>
                </section>
                <br /><br />
                <h1><b>¡Juntos cultivamos el futuro!</b></h1>
            </div>
        </>
    );
};

export default AgroSmart;