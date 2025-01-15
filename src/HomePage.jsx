import React, { useState } from 'react';
import { FeedBack } from './form/pages/FeedBack';
import { Aside, Description, Features, Footer, HomeHeader, SubFooter, NavBar } from './components';


export const HomePage = () => {

    const [isFormOpen, setIsFormOpen] = useState(false);

    const onOpenForm = () => {
        setIsFormOpen(true);
    };

    const onCloseForm = () => {
			setIsFormOpen(false);
		};
  return (
    <>
			<NavBar onOpenForm={ onOpenForm }/>
      <HomeHeader/>
      <Aside/>
			<Features/>
			<Description/>
			<SubFooter/>			

			{/* Modal con el formulario */}
			{isFormOpen && <FeedBack onCloseForm={ onCloseForm } />}
			
			<Footer/>
    </>
  );
};