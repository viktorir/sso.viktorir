<template>
    <section>
        <b>{{ loading }}</b>
        <div class="spinner"></div>
    </section>
</template>

<script>
export default {
    data(){
        return {
            loading: "Loading",
            dotCount: 0,
            intervalId: null
        }
    },
    methods: {
        updateLoading() {
            this.dotCount++;

            if (this.dotCount > 3) {
                this.dotCount = 0;
            }

            this.loading = "Loading" + ".".repeat(this.dotCount);
        }
    },
    mounted() {
        this.intervalId = setInterval(this.updateLoading, 500);
    },
    beforeUnmount() {
        clearInterval(this.intervalId);
    }
}
</script>

<style scoped>
section {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.spinner {
    margin: 8px;
    width: 48px;
    height: 48px;
    border: 5px solid #FFFFFF;
    border-bottom-color: #E31C25;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 
</style>