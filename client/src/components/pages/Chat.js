import { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import Wrapper from '../ui/Wrapper'
import Heading from '../ui/forms/Heading'
import SubmitButton from '../ui/forms/SubmitButton'

const Chat = () => {
	useEffect(() => {
		const data = queryString.parse(window.location.search)
		console.log(data)
	})

	return (
		<Wrapper>
			insert chat here
		</Wrapper>
	)
}

export default Chat