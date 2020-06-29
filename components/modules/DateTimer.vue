<template>
    <div>
        {{timerText}}
    </div>
</template>

<script>
export default {
    props: ['endDate'],
    data() {
        return {
            timerText: null,
            timeOut: null,
        }
    },
    mounted(){
        if(this.endDate){
            this.OnTimer();
        }
    },
    beforeDestroy() {
        clearInterval(this.timeOut);
    },
    methods: {
        OnTimer(){
            this.timeOut = setInterval(_ => {
                let end = this.$moment(this.endDate);
                let currentTime = this.$moment()
                let calc_day = this.$moment.duration(end.diff(currentTime));
                let numberFormat = n => {
                    return n < 10 ? `0${n}` : n
                }
                if(calc_day.years() === 0 && calc_day.months() === 0 && calc_day.days() === 0){
                    this.timerText = `D-Day ${numberFormat(calc_day.hours())}:${numberFormat(calc_day.minutes())}:${numberFormat(calc_day.seconds())}`
                }else {
                    this.timerText = `D-${calc_day.years() * 365 +
                            calc_day.months() * 30 +
                            calc_day.days()} ${numberFormat(
                            calc_day.hours()
                        )}:${numberFormat(calc_day.minutes())}:${numberFormat(
                            calc_day.seconds()
                        )}`;
                }
            },100)
        }
    }
    
}
</script>
<style lang="scss">

</style>