const About = () => {
  return (
    <>
      <section className="w-full max-w-5xl mx-auto px-6 py-16 text-gray-800 dark:text-gray-200 text-justify transition-colors duration-300">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-wide">Sobre Nosotros</h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">Un proyecto hecho por fans, para fans.</p>
        </div>

        <div className="space-y-6 leading-relaxed text-lg text-gray-700 dark:text-gray-300">
          <p>Somos una empresa joven y apasionada por el universo del anime, la cultura otaku, los videojuegos y el coleccionismo. Creemos en la magia que existe detrás de cada carta, cada saga y cada historia que marcó nuestra infancia y sigue marcando generaciones nuevas.</p>

          <p>Por el momento nuestro lanzamiento inicial está enfocado en <span className="text-red-600 font-semibold"> Pokémon TCG</span>, desarrollando una experiencia visual dinámica, viva y pensada para coleccionistas y fanáticos. Este es nuestro punto de partida — la base del viaje.</p>

          <p>Pero esto no se queda acá. A futuro integraremos colecciones y contenido de otros animes icónicos: <span className="text-red-600 font-semibold"> One Piece, Naruto, Dragon Ball, Jujutsu Kaisen </span> y muchos más. Cada expansión traerá algo nuevo: cartas, ilustraciones, datos, lore, rarezas, eventos y una experiencia cada vez más inmersiva.</p>

          <p>Nuestro objetivo es crear una plataforma viva, en crecimiento, donde coleccionar sea más que ver cartas: sea sentirlas.</p>

          <p>Si necesitás información adicional, consultas comerciales, propuestas o lo que necesites — podés dirigirte a la<a href="/contact" className="text-red-600 font-bold ml-1 hover:text-red-500 transition-colors">página de contacto</a>, donde estaremos felices de ayudarte.</p>
        </div>
      </section>
    </>
  );
};

export default About;