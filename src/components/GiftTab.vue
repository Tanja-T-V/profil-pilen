<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const userName = ref(""),
	userMsg = ref(""),
	userGift = ref(""),
	warningRedUserName = ref(true),
	warningRedUserMsg = ref(true),
	warningRedUserGift = ref(true),
	formSendBtn = ref(true),
	showConfetti = ref(false);

const giftOptions = [
	{ value: "Rosor", text: "Rosor" },
	{ value: "GlitterBox", text: "Glitterbox" },
	{ value: "Toarullar", text: "Toarullar" },
	{ value: "Fjäderboa", text: "Fjäderboa" },
	{ value: "Meme", text: "Meme" },
];

const props = defineProps({
	firstname: { required: true, type: String, default: "Okänd" },
	lastname: { required: true, type: String, default: "Okänd" },
});

const emit = defineEmits(["close-tab"]);

function onClickBack() {
	emit("close-tab");
}

function onClickSendGift() {
	showConfetti.value = true;
	formSendBtn.value = true;
	// Confetti timer for transisions.
	setTimeout(function () {
		showConfetti.value = false;
		formSendBtn.value = false;
	}, 3000);
}

watch([userName, userMsg, userGift], () => {
	if (userName.value.length > 1) {
		warningRedUserName.value = false;
	} else {
		warningRedUserName.value = true;
	}
	if (userMsg.value.length > 2) {
		warningRedUserMsg.value = false;
	} else {
		warningRedUserMsg.value = true;
	}
	if (userGift.value.length > 2) {
		warningRedUserGift.value = false;
	}
	// Enabeling send button
	if (
		warningRedUserName.value === false &&
		warningRedUserMsg.value === false &&
		warningRedUserGift.value === false
	) {
		formSendBtn.value = false;
	} else {
		formSendBtn.value = true;
	}
});
</script>

<style>
#tabArea {
	position: absolute;
	z-index: 3000;
	backdrop-filter: blur(8px);
	box-shadow: inset -2px 0 12px rgba(0, 0, 0, 0.219);
	width: 350px;
	padding: 20px 30px 30px 30px;
}

#tabBack {
	background: none;
	border: none;
	cursor: pointer;
}

#tabBack:hover {
	text-decoration: underline;
}

#giftForm {
	width: 200px;
	margin-top: 10px;
}

#confettiGif {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 9999;
	width: 100vw;
	max-width: 100%;
	height: auto;
	display: block;
}

.giftConfetti-fade-enter-from,
.giftConfetti-fade-leave-to {
	opacity: 0;
}
.giftConfetti-fade-enter-to,
.giftConfetti-fade-leave-from {
	opacity: 1;
}
.giftConfetti-fade-enter-active,
.giftConfetti-fade-leave-active {
	transition: opacity 0.2s ease;
}
</style>

<template>
	<div>
		<div id="tabArea" class="blue-dark-bg text-white rounded-end-4">
			<BButton
				id="tabBack"
				class="d-inline-flex align-items-center gap-2 p-0 text-white"
				@click="onClickBack">
				<i class="bi bi-arrow-return-left"></i> Tillbaka
			</BButton>
			<form id="giftForm" class="d-flex flex-column">
				<div id="formName" class="d-flex flex-column mt-3 gap-1">
					<label
						for="userName"
						:class="{ 'text-danger': warningRedUserName }">
						Från:
					</label>
					<BFormInput
						class="form-wid-height"
						id="userName"
						v-model.trim="userName" />
				</div>

				<div id="formSelection" class="d-flex flex-column mt-3 gap-1">
					<label
						for="giftOption"
						:class="{ 'text-danger': warningRedUserGift }">
						Pressent:
					</label>

					<BFormSelect
						class="form-wid-height"
						v-model="userGift"
						:options="giftOptions"
						id="giftOption" />
				</div>
				<div id="formMsg" class="d-flex flex-column mt-3 gap-1">
					<label
						for="message"
						:class="{ 'text-danger': warningRedUserMsg }">
						Meddelande:
					</label>
					<BFormTextarea
						class="form-wid-height"
						id="message"
						v-model="userMsg"
						rows="3" />
				</div>
			</form>

			<div id="sendCard" class="blue-bg rounded-3 mt-4 p-3">
				<p
					data-testid="sendGift"
					class="d-flex justify-content-center fs-4 text-uppercase text-decoration-underline">
					{{ userGift }}
				</p>
				<div class="d-flex gap-2">
					<p class="fw-light">Till:</p>
					<p data-testid="sendTo">
						<strong>
							{{ props.firstname }} {{ props.lastname }}
						</strong>
					</p>
				</div>
				<p class="fw-light">
					<i class="bi bi-chat-left-heart-fill"></i> Meddelande:
				</p>
				<p data-testid="sendMgs" class="ms-5 fw-bold text-break">
					{{ userMsg }}
				</p>
				<p class="fw-light">Hälsningar</p>
				<p data-testid="sendUser" class="ms-5 fw-bold">
					{{ userName }}
				</p>
			</div>
			<BButton
				class="mt-4"
				variant="primary"
				id="formButton"
				@click="onClickSendGift"
				:disabled="formSendBtn">
				Skicka
			</BButton>
		</div>
		<Transition name="giftConfetti">
			<img
				v-if="showConfetti"
				id="confettiGif"
				src="/public/celebration-19390.gif"
				alt="Konfetti regn" />
		</Transition>
	</div>
</template>
