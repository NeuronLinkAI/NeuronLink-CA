import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { useState } from "react"
import { useExtensionState } from "../../context/ExtensionStateContext"
import { validateApiConfiguration } from "../../utils/validate"
import { vscode } from "../../utils/vscode"
import ApiOptions from "../settings/ApiOptions"

const WelcomeView = () => {
	const { apiConfiguration } = useExtensionState()

	const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

	const handleSubmit = () => {
		const error = validateApiConfiguration(apiConfiguration)
		if (error) {
			setErrorMessage(error)
			return
		}
		setErrorMessage(undefined)
		vscode.postMessage({ type: "apiConfiguration", apiConfiguration })
	}

	return (
		<div className="flex flex-col min-h-screen px-0 pb-5">
			<img
				src="../../assets/icons/neuronlink.png"
				alt="Neuron Link Logo"
				style={{ width: "200px", margin: "0 auto", display: "block" }}
			/>
			<h2>Bee Boop! I'm Neuron Link CA, here to help!</h2>
			<p>
				If you are new here, we highy recommend you stick with the Gemini 2.0 Pro Exp model to start. We believe
				it is the most powerful and performant model to date (yes, beating Claud Sonet) for coding. In addition,
				ITS FREE, within the free tier limits. Got to gemini console,
				https://aistudio.google.com/prompts/new_chat , click "get API key" paste here, and get coding!
			</p>

			<b>To get started, this extension needs an API provider.</b>

			<div className="mt-3">
				<ApiOptions fromWelcomeView />
			</div>

			<div className="sticky bottom-0 bg-[var(--vscode-editor-background)] py-3">
				<div className="flex flex-col gap-1.5">
					<VSCodeButton onClick={handleSubmit}>Let's go!</VSCodeButton>
					{errorMessage && <span className="text-destructive">{errorMessage}</span>}
				</div>
			</div>
		</div>
	)
}

export default WelcomeView
