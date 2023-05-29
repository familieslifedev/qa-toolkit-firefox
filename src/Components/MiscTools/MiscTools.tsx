import React, { useEffect } from 'react';
import type { Plan } from "~Utils/planInterface";
import { copyFromClipboard, get2DJson, load2DJson, writeToClipboard } from "~Utils/Utils";
import { sendJsonToFeeder } from "~Utils/JsonHelper";

export default function MiscTools() {


	const autoLayoutTriggered = () => {
		const observer = new MutationObserver((mutationsList, observer) => {
			const LayoutMenuTab:HTMLLIElement | null = document.querySelector('li.layout-step');
			const LayoutMenuTabLink:HTMLAnchorElement | null = LayoutMenuTab ? LayoutMenuTab.querySelector('a') : null;
			const generateBTN:HTMLButtonElement | null = document.querySelector('button.sc-fzXfMC.eoeHYr');

			if (LayoutMenuTabLink && !LayoutMenuTabLink.classList.contains("disabled")) {
				LayoutMenuTabLink.click();
			}

			if (generateBTN) {
				generateBTN.click();
				autoGeneratingLayoutDetectCompletion();
				observer.disconnect();
			}
		});

		observer.observe(document, { childList: true, subtree: true });
	};



	const autoGeneratingLayoutDetectCompletion = () => {
		const observer = new MutationObserver(async (mutationsList, observer) => {
			const splashScreen: HTMLDivElement | null = document.querySelector('.splash-screen');

			if (splashScreen) {
				const splashScreenChild: HTMLDivElement | null = splashScreen.querySelector('#kitchen-layout-splash-screen');

				if (!splashScreenChild) {
					observer.disconnect();
						await copyJsonAsFeeder();


				}
			}
		});

		observer.observe(document, { childList: true, subtree: true});
	}

	const copyJsonAsFeeder = async () => {

		get2DJson().then(async (res) => {
			let currentUrl = window.location.href;
			const urlText = await sendJsonToFeeder(res, res.plan.planId, currentUrl);
			if (urlText){
				console.log(`%cAutolayout Save Json: ${urlText}`, 'color: blue; font-size: medium');
				try {
					await writeToClipboard(urlText);
				}
				catch (e) {
					alert(`Failed to copy to clipboard ${e} /n Link available in console`);
				}

			}
		})

	}

		// This checks on extension mount if the auto-layout generation process has been triggered using a stored chrome storage key to track the state
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


		const handleAutolayoutButton = () => {
			 copyFromClipboard().then((res) => {
				fetch(res).then((res) => res.json().then((res) => {
					let planJson:Plan = res;
					planJson.plan.step = "base-units"
					chrome.storage.local.set({ "autoPlanLoadTriggered": true });
					load2DJson(JSON.stringify(planJson));
				}));
			});
		};


	return (
			<div className="jsonContainer">
				<button className="btn btn-sm btn-wide btn-primary" title="Generates auto-layouts JSONS given a list of plan JSONS" onClick={handleAutolayoutButton}>AutoLayout Gen</button>
			</div>
		);
	}
