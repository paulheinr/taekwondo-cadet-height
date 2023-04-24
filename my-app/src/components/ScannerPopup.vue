<template>
  <div class="popup">
    <div class="popup-inner">
      <div class="row">
        <qrcode-stream :track="paintOutline" @decode="onDecode"></qrcode-stream>
      </div>
      <button class="btn btn-dark popup-close mrgnbtm" @click="TogglePopup()">
        Fenster schließen
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScannerPopup",
  props: ["TogglePopup"],
  methods: {
    onDecode(decodedString) {
      let data = decodedString.replace(/^\D+/g, '');
      this.$emit("scanned-id", data)
      console.log("Scanned ID", data)
      this.TogglePopup();
    },
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const {x, y} of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    background: #FFF;
    padding: 32px;
  }
}
</style>