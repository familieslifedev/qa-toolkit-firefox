import React, { useEffect } from 'react';
import type { Plan } from "~Utils/planInterface";
import { copyFromClipboard, load2DJson } from "~Utils/Utils";

export default function MiscTools() {



	const autoLayoutTriggered = () => {
		const observer = new MutationObserver((mutationsList, observer) => {

			const generateBTN:HTMLButtonElement | null = document.querySelector('button.sc-fzXfMC.eoeHYr');

			if (generateBTN) {
				generateBTN.click();
				autoGeneratingLayoutDetectCompletion();
				observer.disconnect();
			}
		});

		// Start observing the document with the configured parameters
		observer.observe(document, { childList: true, subtree: true });
	};



	const autoGeneratingLayoutDetectCompletion = () => {
		const observer = new MutationObserver((mutationsList, observer) => {
			const splashScreen: HTMLDivElement | null = document.querySelector('.splash-screen');

			if (splashScreen) {
				const splashScreenChild: HTMLDivElement | null = splashScreen.querySelector('#kitchen-layout-splash-screen');

				if (!splashScreenChild) {

					observer.disconnect();
				}
			}
		});

		// Start observing the document with the configured parameters
		observer.observe(document, { childList: true, subtree: true });
	}






		// This checks on extension mount if the auto-layout generation process has been triggered
		useEffect(() => {
			const checkAutoPlanLoadTriggered = () => {
				chrome.storage.local.get(["autoPlanLoadTriggered"], (result) => {
					const autoPlanLoadTriggered = result["autoPlanLoadTriggered"];

					if (autoPlanLoadTriggered === true) {
						autoLayoutTriggered();
						chrome.storage.local.set({ "autoPlanLoadTriggered": false });
					}
				});
			};

			checkAutoPlanLoadTriggered();
		}, []);




		const handleAutolayoutGenInitial = async () => {
			const jsonToLoad = copyFromClipboard().then((res) => {
				fetch(res).then((res) => res.json().then((res) => {
					let planJson:Plan = res;
					planJson.plan.step = "layout"
					chrome.storage.local.set({ "autoPlanLoadTriggered": true });
					load2DJson(JSON.stringify(planJson));
				}));
				console.log(res);
			});
		};


		return (
			<div className="jsonContainer">
				<button className="btn btn-sm btn-wide btn-primary" title="Generates auto-layouts JSONS given a list of plan JSONS" onClick={handleAutolayoutGenInitial}>AutoLayout Gen</button>
			</div>
		);
	}
