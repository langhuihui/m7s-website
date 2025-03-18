<template>
  <div class="footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="logo">
          <img
            :src="withBase('/img/footer-logo.png')"
            alt="不卡科技 MONIBUCA"
            width="200"
          />
        </div>
        <div class="top-right">
          <span class="community">Monibuca 开源社区</span>
          <span class="divider">|</span>
          <span class="support">支持我们</span>
          <div class="popover-wrapper">
            <img
              :src="withBase('/img/weixin.png')"
              alt="微信"
              width="28"
              @mouseenter="showWxQR = true"
              @mouseleave="showWxQR = false"
            />
            <div class="popover-content" v-show="showWxQR">
              <img
                :src="withBase('/img/wx-pay.jpg')"
                alt="微信支付"
                height="250"
              />
            </div>
          </div>
          <div class="popover-wrapper">
            <img
              :src="withBase('/img/zhifubao.png')"
              alt="支付宝"
              width="28"
              @mouseenter="showZfQR = true"
              @mouseleave="showZfQR = false"
            />
            <div class="popover-content" v-show="showZfQR">
              <img
                :src="withBase('/img/zf-pay.jpg')"
                alt="支付宝"
                height="250"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="footer-links">
        <div class="link-column">
          <h3>视频教程</h3>
          <a href="https://space.bilibili.com/328443019/lists?sid=514619"
            >B 站视频</a
          >
          <a href="https://www.bilibili.com/video/BV1jg411H7qE">RTS 分享</a>
        </div>

        <div class="link-column">
          <h3>产品文档</h3>
          <a href="/guide/quickstart">快速上手</a>
          <a href="/guide/faq">常见问题</a>
        </div>

        <div class="link-column">
          <h3>下载链接</h3>
          <a href="#">Windows</a>
          <a href="#">Mac</a>
          <a href="#">Mac(arm64)</a>
          <a href="#">Linux</a>
          <a href="#">Linux(arm64)</a>
        </div>

        <div class="link-column">
          <h3>不卡系列</h3>
          <a href="https://monibuca.com">Monibuca</a>
          <a href="https://jessibuca.com">Jessibuca</a>
          <a href="https://rebebuca.com">Rebebuca</a>
        </div>

        <div class="link-column">
          <h3>关于我们</h3>
          <a href="/about/faq">FAQ</a>
          <a href="/about/team">开发团队</a>
          <a href="/about/story">诞生故事</a>
        </div>

        <div class="link-column">
          <h3>联系我们</h3>
          <div
            class="contact-item"
            @mouseenter="showWxMpQR = true"
            @mouseleave="showWxMpQR = false"
          >
            <span>微信公众号：不卡科技</span>
            <div class="popover-wrapper">
              <img
                :src="withBase('/img/ic_QR code.svg')"
                alt="二维码图标"
                class="qr-small"
              />
              <div class="popover-content contact-qrcode" v-show="showWxMpQR">
                <img
                  :src="withBase('/img/wx-mp.jpg')"
                  alt="微信公众号"
                  height="250"
                />
              </div>
            </div>
          </div>
          <div
            class="contact-item"
            @mouseenter="showQQGroupQR = true"
            @mouseleave="showQQGroupQR = false"
          >
            <span>QQ群：751639168</span>
            <div class="popover-wrapper">
              <img
                :src="withBase('/img/ic_QR code.svg')"
                alt="二维码图标"
                class="qr-small"
              />
              <div
                class="popover-content contact-qrcode"
                v-show="showQQGroupQR"
              >
                <img
                  :src="withBase('/img/qqgroup.jpg')"
                  alt="QQ群"
                  height="250"
                />
              </div>
            </div>
          </div>
          <div
            class="contact-item"
            @mouseenter="showQQChannelQR = true"
            @mouseleave="showQQChannelQR = false"
          >
            <span>QQ频道：p0qq0crz08</span>
            <div class="popover-wrapper">
              <img
                :src="withBase('/img/ic_QR code.svg')"
                alt="二维码图标"
                class="qr-small"
              />
              <div
                class="popover-content contact-qrcode"
                v-show="showQQChannelQR"
              >
                <img
                  :src="withBase('/img/qq-qun.jpeg')"
                  alt="QQ频道"
                  height="250"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chinese-copyright">
      <div class="copyright-content">
        <div>©2024 Monibuca All Rights Reserved 南京莫妮不卡科技有限公司</div>
        <div style="display: flex">
          <a href="https://beian.miit.gov.cn/">苏ICP备20230258075号-1</a>
          <a
            style="display: flex"
            href="https://monibuca.com/#:~:text=%E8%8B%8F%E5%85%AC%E7%BD%91%E5%AE%89%E5%A4%87%2032011302321580%E5%8F%B7"
            ><img
              :src="withBase('/img/beian.png')"
              alt="公安图标"
              style="margin-left: 10px"
            />苏公网安备 32011302321580号</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { withBase, useData } from "vitepress";

const { site } = useData();
const showWxQR = ref(false);
const showZfQR = ref(false);
const showWxMpQR = ref(false);
const showQQGroupQR = ref(false);
const showQQChannelQR = ref(false);
</script>

<style scoped>
.footer {
  background-color: #1a1a1a;
  color: #fff;
  padding-top: 40px;
  width: 100%;
  margin-top: 100px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 40px;
}

.top-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.github-link {
  opacity: 0.7;
  transition: opacity 0.2s;
}

.github-link:hover {
  opacity: 1;
}

.community,
.support {
  color: rgba(255, 255, 255, 0.7);
}

.divider {
  color: rgba(255, 255, 255, 0.3);
}

.popover-wrapper {
  position: relative;
  cursor: pointer;
}

.popover-content {
  position: absolute;
  bottom: 40px;
  right: -110px;
  background: white;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

/* 联系方式中的二维码弹出框位置调整 */
.contact-qrcode {
  bottom: 0;
  left: -280px;
  right: auto;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 30px;
  padding-bottom: 50px;
}

.link-column {
  display: flex;
  flex-direction: column;
}

.link-column h3 {
  color: #fff;
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: normal;
}

.link-column a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  margin-bottom: 12px;
  font-size: 14px;
  transition: color 0.2s;
}

.link-column a:hover {
  color: rgba(255, 255, 255, 0.8);
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.qr-small {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.logo {
  height: 40px;
}

.chinese-copyright {
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 20px 0;
  text-align: center;
  width: 100%;
  margin-top: 40px;
}

.copyright-content {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}
.copyright-content a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
}
@media (max-width: 1100px) {
  .footer-links {
    grid-template-columns: repeat(3, 1fr);
  }

  .contact-qrcode {
    left: -280px;
    right: auto;
  }
}

@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .logo {
    margin-bottom: 20px;
  }

  .top-right {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .contact-qrcode {
    left: -280px;
    right: auto;
  }
}

@media (max-width: 480px) {
  .footer-links {
    grid-template-columns: 1fr;
  }

  .contact-qrcode {
    left: -280px;
    right: auto;
  }
}
</style>
