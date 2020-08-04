import React, {Profiler} from 'react'

import {HomePageContainer} from './homepage.styles.js';
import Directory from '../../components/directory/directory.component';

const HomePage = () => {
   // throw Error;
    return (
        <HomePageContainer>
            <Profiler id="Directory" onRender={(id, phase, actualDuration) => {
                console.log({
                    id,
                    phase,
                    actualDuration
                });
            }}>
         <Directory/>
            </Profiler>
        </HomePageContainer>
    );
}

export default HomePage;
