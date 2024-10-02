import { motion } from 'framer-motion'
import { useState } from 'react'

const links = [
  { href: '#1', label: 'Home' },
  { href: '#2', label: 'About' },
  { href: '#3', label: 'Services' },
  { href: '#4', label: 'Contact' },
];

// Анимационные варианты для родителя и дочерних элементов
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // задержка между анимацией детей
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -2 },
  visible: {
    opacity: 1,
    y: 0,
  },
};


function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  // Закрыть меню
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav
      initial={{ height: '4rem' }}
      className={`rounded-2xl  w-full  max-w-2xl mx-auto bg-zinc-100 p-5 rounded-2xl"`}
      animate={{
        height: isOpen ? '13.5rem' : '4rem',
        transition: {
          type: 'spring',   
          stiffness: 700,     
          damping: 30,      
        },
      }}
    >

    <div className='flex justify-between items-center'>
          <span className="font-bold">Logo</span>
  
          <div className="hidden md:flex space-x-6">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
  
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="font-semibold">
              {isOpen ? 'Закрыть' : 'Открыть'}
            </button>
          </div>
    </div>


      {/* Мобильное меню с анимацией */}
      {isOpen && (
        <motion.div
          className="py-5 flex flex-col gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              variants={itemVariants} // Используем варианты для дочерних элементов
              className="font-medium"
              onClick={closeMenu}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Nav;
