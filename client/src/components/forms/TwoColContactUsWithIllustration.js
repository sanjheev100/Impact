import React, { useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { css } from 'styled-components/macro' //eslint-disable-line
import axios from 'axios'
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from 'components/misc/Headings.js'
import { PrimaryButton as PrimaryButtonBase } from 'components/misc/Buttons.js'
import EmailIllustrationSrc from 'images/email-illustration.svg'

const Container = tw.div`relative`
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`
const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
])

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
])
const TextContent = tw.div`lg:py-8 text-center md:text-left`

const Subheading = tw(SubheadingBase)`text-center md:text-left`
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col lg:flex-row`
const Input = tw.input`border-2 px-5 py-3 rounded focus:outline-none font-medium transition duration-300 hocus:border-primary-500`

const SubmitButton = tw(PrimaryButtonBase)`inline-block lg:ml-6 mt-6 lg:mt-0`

export default ({
  subheading = 'Contact Us',
  heading = (
    <>
      Feel free to <span tw='text-primary-500'>get in touch</span>
      <wbr /> with us.
    </>
  ),
  description = 'You have big goals. We have the expertise to help you reach them.',
  submitButtonText = 'Contact Me',
  // formAction = '#',
  // formMethod = 'get',
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  const [name, setName] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [descriptionForm, setDescriptionForm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      name,
      email,
      phone,
      description: descriptionForm,
    }
    setLoading(true)
    axios
      .post(`${process.env.REACT_APP_BACKEND}/sendEmail`, payload)
      .then((res) => {
        setSuccess('Request Recevied Our Executive will contact you shortly')
        setEmail('')
        setDescriptionForm('')
        setName('')
        setPhone('')
        setLoading(false)
        setTimeout(() => {
          setSuccess('')
        }, 6000)
        // document.body.scrollTop = document.documentElement.scrollTop = 0
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 2000)
      })
      .catch((error) => {
        console.log(error)
        setError('Something Happend Please Try again later')
        setTimeout(() => {
          setError('')
        }, 6000)
        setLoading(false)
      })
  }

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            <br />
            {error && (
              <p
                className='error'
                style={{
                  background: '#fff0f0',
                  color: '#ff0000',
                  padding: '10px',
                }}
              >
                {error}
              </p>
            )}

            {success && (
              <p
                className='success'
                style={{
                  background: '#e7f7e2',
                  color: '#0cf327',
                  padding: '10px',
                }}
              >
                {success}
              </p>
            )}
            <br />

            <form onSubmit={(e) => handleSubmit(e)}>
              <Input
                type='text'
                onChange={(e) => setName(e.target.value)}
                name='name'
                placeholder='Your Name'
                value={name}
              />{' '}
              <br />
              <br />
              <Input
                type='email'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your Email Address'
                value={email}
              />{' '}
              <br />
              <br />
              <Input
                type='Number'
                name='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Your Mobile Number'
              />
              <br />
              <br />
              <Input
                type='text'
                onChange={(e) => setDescriptionForm(e.target.value)}
                value={descriptionForm}
                name='description'
                placeholder='description'
              />
              <br />
              <br />
              {/* <SubmitButton
                disabled={
                  !name || !phone || !email || !descriptionForm || loading
                }
                type='submit'
                stu
              >
                {submitButtonText}
              </SubmitButton> */}
              <button
                style={{
                  backgroundColor: '#4CAF50',
                  border: 'none',
                  color: 'white',
                  padding: '15px 32px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'inline-block',
                  fontSize: '16px',
                }}
                type='submit'
              >
                Contact us
              </button>
            </form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  )
}
