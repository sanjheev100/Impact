import React from 'react'
import tw from 'twin.macro' //eslint-disable-line
import { css } from 'styled-components/macro' //eslint-disable-line
import AnimationRevealPage from 'helpers/AnimationRevealPage.js'

import Hero from 'components/hero/BackgroundAsImage.js'
import Features from 'components/features/DashedBorderSixFeatures'
import MainFeature from 'components/features/TwoColSingleFeatureWithStats2.js'
import MainFeature2 from 'components/features/TwoColWithTwoFeaturesAndButtons.js'
import Blog from 'components/blogs/ThreeColSimpleWithImageAndDashedBorder.js'
import ContactUsForm from 'components/forms/TwoColContactUsWithIllustration.js'

export default () => (
  <AnimationRevealPage>
    <Hero />
    {/* <MainFeature /> */}
    <Features />
    <MainFeature2 />
    <Blog />
    <ContactUsForm />
  </AnimationRevealPage>
)
