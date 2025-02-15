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
				src="../../../../assets/icons/neuronlink.png"
				alt="Neuron Link Logo"
				style={{ width: "200px", margin: "0 auto", display: "block" }}
			/>
			<h2>Welcome to Neuron Link Code Agent, here to help!</h2>
			<p>
				If you are new here, we highly recommend starting with the Gemini 2.0 Pro Exp model. We believe it is
				the most powerful and performant model currently available for coding (even surpassing Claude Sonet).
				Additionally, it's free within the free tier limits.
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
