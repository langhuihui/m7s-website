<template>
  <BaseIcon viewBox="0 0 1000 600">
    <defs>
      <!-- Gradients for different sections -->
      <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--core-gradient-start)" />
        <stop offset="100%" stop-color="var(--core-gradient-end)" />
      </linearGradient>
      <linearGradient id="funcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--func-gradient-start)" />
        <stop offset="100%" stop-color="var(--func-gradient-end)" />
      </linearGradient>
      <linearGradient id="protocolGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--protocol-gradient-start)" />
        <stop offset="100%" stop-color="var(--protocol-gradient-end)" />
      </linearGradient>
      <linearGradient id="utilGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--util-gradient-start)" />
        <stop offset="100%" stop-color="var(--util-gradient-end)" />
      </linearGradient>
      <linearGradient id="dbGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--db-gradient-start)" />
        <stop offset="100%" stop-color="var(--db-gradient-end)" />
      </linearGradient>
      <linearGradient id="adminGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--admin-gradient-start)" />
        <stop offset="100%" stop-color="var(--admin-gradient-end)" />
      </linearGradient>
      <linearGradient id="rightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--right-gradient-start)" />
        <stop offset="100%" stop-color="var(--right-gradient-end)" />
      </linearGradient>
      <linearGradient id="leftGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--left-gradient-start)" />
        <stop offset="100%" stop-color="var(--left-gradient-end)" />
      </linearGradient>
    </defs>

    <!-- Title: visualization -->
    <g class="visualization-title">
      <image href="/logo.svg" x="430" y="20" width="60" height="60" />
      <text x="500" y="60" class="title" fill="var(--text-color)"
        >visualization</text
      >
    </g>

    <!-- m7s Admin section -->
    <g class="admin-section">
      <rect
        x="20"
        y="90"
        width="960"
        height="60"
        rx="5"
        fill="url(#adminGradient)"
        stroke="var(--border-color)"
        stroke-width="1"
        stroke-dasharray="5,5"
        class="admin-box"
      />
      <text x="500" y="130" class="section-title" fill="var(--text-color)"
        >m7s Admin</text
      >
      <text x="470" y="130" class="logo-text" fill="var(--logo-color)"
        >m7s</text
      >
    </g>

    <!-- Functional plugins section -->
    <g class="functional-section">
      <text x="500" y="190" class="section-title" fill="var(--text-color)"
        >functional plugins</text
      >
      <rect
        x="250"
        y="230"
        width="700"
        height="80"
        rx="5"
        fill="transparent"
        stroke="var(--border-color)"
        stroke-width="1"
        stroke-dasharray="5,5"
        class="section-box"
      />

      <!-- Plugin boxes -->
      <g class="plugin-boxes">
        <rect
          x="280"
          y="240"
          width="80"
          height="60"
          rx="5"
          fill="url(#funcGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="320" y="275" class="plugin-text" fill="var(--text-color)"
          >transcode</text
        >

        <rect
          x="370"
          y="240"
          width="80"
          height="60"
          rx="5"
          fill="url(#funcGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="410" y="275" class="plugin-text" fill="var(--text-color)"
          >crypto</text
        >

        <rect
          x="460"
          y="240"
          width="80"
          height="60"
          rx="5"
          fill="url(#funcGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="500" y="275" class="plugin-text" fill="var(--text-color)"
          >cascade</text
        >

        <rect
          x="550"
          y="240"
          width="80"
          height="60"
          rx="5"
          fill="url(#funcGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="590" y="275" class="plugin-text" fill="var(--text-color)"
          >sei</text
        >

        <rect
          x="640"
          y="240"
          width="80"
          height="60"
          rx="5"
          fill="url(#funcGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="680" y="275" class="plugin-text" fill="var(--text-color)"
          >onvif</text
        >

        <rect
          x="730"
          y="240"
          width="80"
          height="60"
          rx="5"
          fill="url(#funcGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="770" y="275" class="plugin-text" fill="var(--text-color)"
          >ai</text
        >

        <rect
          x="820"
          y="240"
          width="80"
          height="60"
          rx="5"
          fill="url(#funcGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="860" y="275" class="plugin-text" fill="var(--text-color)"
          >...</text
        >
      </g>
    </g>

    <!-- Protocol plugins section -->
    <g class="protocol-section">
      <text x="500" y="330" class="section-title" fill="var(--text-color)"
        >protocol plugins</text
      >
      <rect
        x="250"
        y="350"
        width="700"
        height="80"
        rx="5"
        fill="transparent"
        stroke="var(--border-color)"
        stroke-width="1"
        stroke-dasharray="5,5"
        class="section-box"
      />

      <!-- Plugin boxes -->
      <g class="plugin-boxes">
        <rect
          x="280"
          y="360"
          width="80"
          height="60"
          rx="5"
          fill="url(#protocolGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="320" y="395" class="plugin-text" fill="var(--text-color)"
          >rtmp</text
        >

        <rect
          x="370"
          y="360"
          width="80"
          height="60"
          rx="5"
          fill="url(#protocolGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="410" y="395" class="plugin-text" fill="var(--text-color)"
          >rtsp</text
        >

        <rect
          x="460"
          y="360"
          width="80"
          height="60"
          rx="5"
          fill="url(#protocolGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="500" y="395" class="plugin-text" fill="var(--text-color)"
          >webrtc</text
        >

        <rect
          x="550"
          y="360"
          width="80"
          height="60"
          rx="5"
          fill="url(#protocolGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="590" y="395" class="plugin-text" fill="var(--text-color)"
          >gb28181</text
        >

        <rect
          x="640"
          y="360"
          width="80"
          height="60"
          rx="5"
          fill="url(#protocolGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="680" y="395" class="plugin-text" fill="var(--text-color)"
          >hls</text
        >

        <rect
          x="730"
          y="360"
          width="80"
          height="60"
          rx="5"
          fill="url(#protocolGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="770" y="395" class="plugin-text" fill="var(--text-color)"
          >flv</text
        >

        <rect
          x="820"
          y="360"
          width="80"
          height="60"
          rx="5"
          fill="url(#protocolGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="860" y="395" class="plugin-text" fill="var(--text-color)"
          >...</text
        >
      </g>
    </g>

    <!-- Util plugins section -->
    <g class="util-section">
      <text x="500" y="460" class="section-title" fill="var(--text-color)"
        >util plugins</text
      >
      <rect
        x="250"
        y="480"
        width="700"
        height="80"
        rx="5"
        fill="transparent"
        stroke="var(--border-color)"
        stroke-width="1"
        stroke-dasharray="5,5"
        class="section-box"
      />

      <!-- Plugin boxes -->
      <g class="plugin-boxes">
        <rect
          x="280"
          y="490"
          width="80"
          height="60"
          rx="5"
          fill="url(#utilGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="320" y="525" class="plugin-text" fill="var(--text-color)"
          >logrotate</text
        >

        <rect
          x="370"
          y="490"
          width="80"
          height="60"
          rx="5"
          fill="url(#utilGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="410" y="525" class="plugin-text" fill="var(--text-color)"
          >debug</text
        >

        <rect
          x="460"
          y="490"
          width="80"
          height="60"
          rx="5"
          fill="url(#utilGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="500" y="525" class="plugin-text" fill="var(--text-color)"
          >monitor</text
        >

        <rect
          x="550"
          y="490"
          width="80"
          height="60"
          rx="5"
          fill="url(#utilGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="590" y="525" class="plugin-text" fill="var(--text-color)"
          >hook</text
        >

        <rect
          x="640"
          y="490"
          width="80"
          height="60"
          rx="5"
          fill="url(#utilGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="plugin-box"
        />
        <text x="680" y="525" class="plugin-text" fill="var(--text-color)"
          >stress</text
        >
      </g>
    </g>

    <!-- Core section -->
    <g class="core-section">
      <text x="500" y="580" class="section-title" fill="var(--text-color)"
        >core</text
      >
      <rect
        x="250"
        y="600"
        width="700"
        height="150"
        rx="5"
        fill="transparent"
        stroke="var(--border-color)"
        stroke-width="1"
        stroke-dasharray="5,5"
        class="section-box"
      />

      <!-- Core components -->
      <g class="core-components">
        <rect
          x="280"
          y="620"
          width="160"
          height="60"
          rx="5"
          fill="url(#coreGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="core-box"
        />
        <text x="360" y="655" class="core-text" fill="var(--text-color)"
          >ring buffer</text
        >

        <rect
          x="520"
          y="620"
          width="160"
          height="60"
          rx="5"
          fill="url(#coreGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="core-box"
        />
        <text x="600" y="655" class="core-text" fill="var(--text-color)"
          >task system</text
        >

        <rect
          x="760"
          y="620"
          width="160"
          height="60"
          rx="5"
          fill="url(#coreGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="core-box"
        />
        <text x="840" y="655" class="core-text" fill="var(--text-color)"
          >plugin system</text
        >

        <rect
          x="280"
          y="690"
          width="160"
          height="60"
          rx="5"
          fill="url(#coreGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="core-box"
        />
        <text x="360" y="725" class="core-text" fill="var(--text-color)"
          >memory pool</text
        >

        <rect
          x="520"
          y="690"
          width="160"
          height="60"
          rx="5"
          fill="url(#coreGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="core-box"
        />
        <text x="600" y="725" class="core-text" fill="var(--text-color)"
          >pub-sub</text
        >

        <rect
          x="760"
          y="690"
          width="160"
          height="60"
          rx="5"
          fill="url(#coreGradient)"
          stroke="var(--border-color)"
          stroke-width="1"
          class="core-box"
        />
        <text x="840" y="725" class="core-text" fill="var(--text-color)"
          >alias system</text
        >
      </g>
    </g>

    <!-- Database section -->
    <g class="database-section">
      <text x="500" y="790" class="section-title" fill="var(--text-color)"
        >database</text
      >
      <rect
        x="250"
        y="810"
        width="700"
        height="100"
        rx="5"
        fill="transparent"
        stroke="var(--border-color)"
        stroke-width="1"
        stroke-dasharray="5,5"
        class="section-box"
      />

      <!-- Database logos -->
      <g class="database-logos">
        <g>
          <!-- SQLite Icon -->
          <rect
            x="320"
            y="830"
            width="60"
            height="30"
            rx="5"
            fill="url(#dbGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <path
            d="M335,840 h30 M335,850 h30 M345,840 v10 M355,840 v10"
            stroke="var(--text-color)"
            stroke-width="1.5"
            fill="none"
          />
          <text x="320" y="875" class="db-text" fill="var(--text-color)"
            >SQLite</text
          >
        </g>
        <g>
          <!-- MySQL Icon -->
          <rect
            x="470"
            y="830"
            width="60"
            height="30"
            rx="5"
            fill="url(#dbGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <path
            d="M480,840 l10,10 M490,840 l-10,10 M500,840 l10,10 M510,840 l-10,10"
            stroke="var(--text-color)"
            stroke-width="1.5"
            fill="none"
          />
          <path
            d="M485,835 h30"
            stroke="var(--text-color)"
            stroke-width="2"
            fill="none"
          />
          <text x="470" y="875" class="db-text" fill="var(--text-color)"
            >MySQL</text
          >
        </g>
        <g>
          <!-- PostgreSQL Icon -->
          <rect
            x="620"
            y="830"
            width="60"
            height="30"
            rx="5"
            fill="url(#dbGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <circle
            cx="650"
            cy="845"
            r="10"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1"
          />
          <path
            d="M642,845 h16 M650,837 v16 M643,838 l14,14 M643,852 l14,-14"
            stroke="var(--text-color)"
            stroke-width="1"
            fill="none"
          />
          <text x="620" y="875" class="db-text" fill="var(--text-color)"
            >PostgreSQL</text
          >
        </g>
        <g>
          <!-- DuckDB Icon -->
          <rect
            x="770"
            y="830"
            width="60"
            height="30"
            rx="5"
            fill="url(#dbGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <path
            d="M780,840 h10 v10 h-10 z M800,840 h10 v10 h-10 z"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1.5"
          />
          <path
            d="M790,845 h10 M795,840 v10"
            stroke="var(--text-color)"
            stroke-width="1.5"
            fill="none"
          />
          <text x="770" y="875" class="db-text" fill="var(--text-color)"
            >DuckDB</text
          >
        </g>
      </g>
    </g>

    <!-- Left sidebar -->
    <g class="left-sidebar">
      <rect
        x="20"
        y="230"
        width="200"
        height="680"
        rx="5"
        fill="transparent"
        stroke="var(--border-color)"
        stroke-width="1"
        stroke-dasharray="5,5"
        class="sidebar-box"
      />

      <!-- Left sidebar technology logos -->
      <g class="left-sidebar-logos">
        <g>
          <!-- ONNX Icon (inspired by Skill Icons) -->
          <rect
            x="90"
            y="240"
            width="60"
            height="30"
            rx="5"
            fill="url(#leftGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <path
            d="M112,255 L120,245 L128,255 L120,265 Z"
            stroke="var(--text-color)"
            stroke-width="1"
            fill="none"
          />
          <circle cx="120" cy="255" r="2" fill="var(--text-color)" />
          <text x="120" y="285" class="sidebar-text" fill="var(--text-color)"
            >ONNX</text
          >
        </g>
        <g>
          <!-- Docker Icon (from Simple Icons) -->
          <rect
            x="90"
            y="320"
            width="60"
            height="30"
            rx="5"
            fill="url(#leftGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <path
            d="M110,335 h8 v-8 h-8 z M120,335 h8 v-8 h-8 z M130,335 h8 v-8 h-8 z M110,325 h8 v-8 h-8 z M120,325 h8 v-8 h-8 z"
            fill="var(--text-color)"
          />
          <text x="120" y="365" class="sidebar-text" fill="var(--text-color)"
            >Docker</text
          >
        </g>
        <g>
          <!-- Kubernetes Icon (from Simple Icons) -->
          <rect
            x="90"
            y="400"
            width="60"
            height="30"
            rx="5"
            fill="url(#leftGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <path
            d="M120,405 l-10,3.5 v12 l10,3.5 l10,-3.5 v-12 z"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1"
          />
          <path
            d="M120,412 l6,3.5 l-6,3.5 l-6,-3.5 z"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1"
          />
          <text x="120" y="445" class="sidebar-text" fill="var(--text-color)"
            >Kubernetes</text
          >
        </g>
        <g>
          <!-- Prometheus Icon (from Simple Icons) -->
          <rect
            x="90"
            y="480"
            width="60"
            height="30"
            rx="5"
            fill="url(#leftGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <path
            d="M115,495 h10 M120,485 v10 M115,487 l10,6 M115,493 l10,-6"
            stroke="var(--text-color)"
            stroke-width="1.5"
            fill="none"
          />
          <circle
            cx="120"
            cy="495"
            r="10"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1"
          />
          <text x="120" y="525" class="sidebar-text" fill="var(--text-color)"
            >Prometheus</text
          >
        </g>
        <g>
          <!-- Grafana Icon (from Simple Icons) -->
          <rect
            x="90"
            y="560"
            width="60"
            height="30"
            rx="5"
            fill="url(#leftGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <path
            d="M110,573 C110,578 115,585 120,585 C125,585 130,578 130,573 C130,568 125,565 120,565 C115,565 110,568 110,573 Z"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1.5"
          />
          <path
            d="M115,570 L125,576 M115,576 L125,570"
            stroke="var(--text-color)"
            stroke-width="1"
          />
          <text x="120" y="605" class="sidebar-text" fill="var(--text-color)"
            >Grafana</text
          >
        </g>
        <g>
          <!-- Cloud Icon (from Material Icons) -->
          <rect
            x="90"
            y="640"
            width="60"
            height="30"
            rx="5"
            fill="url(#leftGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <path
            d="M110,655 C107,650 110,645 115,645 C115,640 125,640 125,645 C130,643 135,648 130,655 Z"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1.5"
          />
          <text x="120" y="685" class="sidebar-text" fill="var(--text-color)"
            >Cloud</text
          >
        </g>
      </g>
    </g>

    <!-- Right sidebar -->
    <g class="right-sidebar">
      <rect
        x="980"
        y="230"
        width="200"
        height="680"
        rx="5"
        fill="transparent"
        stroke="var(--border-color)"
        stroke-width="1"
        stroke-dasharray="5,5"
        class="sidebar-box"
      />

      <!-- Right sidebar technology logos -->
      <g class="right-sidebar-logos">
        <g>
          <!-- gRPC Icon (from Simple Icons) -->
          <rect
            x="1050"
            y="240"
            width="60"
            height="30"
            rx="5"
            fill="url(#rightGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <path
            d="M1065,255 h30 M1065,255 l5,-5 M1065,255 l5,5 M1095,255 l-5,-5 M1095,255 l-5,5"
            stroke="var(--text-color)"
            stroke-width="1.5"
            fill="none"
          />
          <text x="1080" y="285" class="sidebar-text" fill="var(--text-color)"
            >gRPC</text
          >
        </g>
        <g>
          <!-- REST API Icon (from Tabler Icons) -->
          <rect
            x="1050"
            y="320"
            width="60"
            height="30"
            rx="5"
            fill="url(#rightGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <path
            d="M1065,335 h30 M1075,325 v20 M1085,325 v20"
            stroke="var(--text-color)"
            stroke-width="1.5"
            fill="none"
          />
          <text x="1080" y="365" class="sidebar-text" fill="var(--text-color)"
            >REST API</text
          >
        </g>
        <g>
          <!-- NVR Icon (from Tabler Icons - camera) -->
          <rect
            x="1050"
            y="400"
            width="60"
            height="30"
            rx="5"
            fill="url(#rightGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <rect
            x="1065"
            y="405"
            width="24"
            height="16"
            rx="2"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1.5"
          />
          <circle
            cx="1077"
            cy="413"
            r="3"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1"
          />
          <path
            d="M1089,413 l6,-3 v16 l-6,-3"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1"
          />
          <text x="1080" y="445" class="sidebar-text" fill="var(--text-color)"
            >NVR</text
          >
        </g>
        <g>
          <!-- Drone Icon (from Tabler Icons) -->
          <rect
            x="1050"
            y="480"
            width="60"
            height="30"
            rx="5"
            fill="url(#rightGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <circle cx="1080" cy="495" r="2" fill="var(--text-color)" />
          <circle cx="1070" cy="485" r="2" fill="var(--text-color)" />
          <circle cx="1090" cy="485" r="2" fill="var(--text-color)" />
          <circle cx="1070" cy="505" r="2" fill="var(--text-color)" />
          <circle cx="1090" cy="505" r="2" fill="var(--text-color)" />
          <path
            d="M1080,495 L1070,485 M1080,495 L1090,485 M1080,495 L1070,505 M1080,495 L1090,505"
            stroke="var(--text-color)"
            stroke-width="1"
          />
          <text x="1080" y="525" class="sidebar-text" fill="var(--text-color)"
            >Drone</text
          >
        </g>
        <g>
          <!-- VLC Icon (from Simple Icons) -->
          <rect
            x="1050"
            y="560"
            width="60"
            height="30"
            rx="5"
            fill="url(#rightGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <path
            d="M1080,565 l-12,15 h24 z"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1.5"
          />
          <circle cx="1080" cy="562" r="1" fill="var(--text-color)" />
          <text x="1080" y="605" class="sidebar-text" fill="var(--text-color)"
            >VLC</text
          >
        </g>
        <g>
          <!-- FFmpeg Icon (from Simple Icons) -->
          <rect
            x="1050"
            y="640"
            width="60"
            height="30"
            rx="5"
            fill="url(#rightGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <path
            d="M1065,645 h10 v10 h-10 z M1075,645 v5 h10 v5 h-10 M1095,645 h-10 v10 h10"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1.5"
          />
          <text x="1080" y="685" class="sidebar-text" fill="var(--text-color)"
            >FFmpeg</text
          >
        </g>
        <g>
          <!-- OBS Icon (from Simple Icons) -->
          <rect
            x="1050"
            y="720"
            width="60"
            height="30"
            rx="5"
            fill="url(#rightGradient)"
            stroke="var(--border-color)"
            stroke-width="1"
          />
          <circle
            cx="1080"
            cy="735"
            r="8"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1.5"
          />
          <path
            d="M1075,735 a3,5 0 1,0 0,0.01 M1085,735 a3,5 0 1,0 0,0.01"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="1.5"
          />
          <text x="1080" y="765" class="sidebar-text" fill="var(--text-color)"
            >OBS</text
          >
        </g>
      </g>
    </g>

    <!-- Connecting lines -->
    <g class="connecting-lines">
      <!-- Add connecting lines without animation here -->
      <path d="M500 150 L500 220" class="connection-line" />
      <path d="M500 290 L500 340" class="connection-line" />
      <path d="M500 430 L500 470" class="connection-line" />
      <path d="M500 560 L500 590" class="connection-line" />
      <path d="M500 750 L500 780" class="connection-line" />
    </g>
  </BaseIcon>
</template>

<script setup>
import BaseIcon from "./base-icon.vue";
</script>

<style>
:root {
  /* Light theme colors */
  --core-gradient-start: #ffb3b3;
  --core-gradient-end: #ff8080;
  --func-gradient-start: #e6e6c6;
  --func-gradient-end: #d6d6a8;
  --protocol-gradient-start: #d6e0c6;
  --protocol-gradient-end: #c6d6a8;
  --util-gradient-start: #e0e8d6;
  --util-gradient-end: #d0e0c0;
  --db-gradient-start: #b3d9ff;
  --db-gradient-end: #80bfff;
  --admin-gradient-start: #f7d6e6;
  --admin-gradient-end: #f2c6dd;
  --right-gradient-start: #b3d9ff;
  --right-gradient-end: #80bfff;
  --left-gradient-start: #d6e6f2;
  --left-gradient-end: #c6dbe6;
  --text-color: #333;
  --logo-color: #6200ee;
  --border-color: #666;
  --line-color: #666;
}

/* 支持两种暗色模式触发方式：系统偏好和 VitePress 主题切换 */
@media (prefers-color-scheme: dark) {
  :root {
    /* Dark theme colors */
    --core-gradient-start: #8a2525;
    --core-gradient-end: #b53030;
    --func-gradient-start: #5d5d40;
    --func-gradient-end: #6c6c4a;
    --protocol-gradient-start: #515d40;
    --protocol-gradient-end: #5d6938;
    --util-gradient-start: #56694d;
    --util-gradient-end: #495736;
    --db-gradient-start: #294d73;
    --db-gradient-end: #366ca6;
    --admin-gradient-start: #5d2933;
    --admin-gradient-end: #7a293f;
    --right-gradient-start: #294d73;
    --right-gradient-end: #366ca6;
    --left-gradient-start: #294d66;
    --left-gradient-end: #386c7a;
    --text-color: #ffffff;
    --logo-color: #d7b8fc;
    --border-color: #aaaaaa;
    --line-color: #aaaaaa;
  }
}

/* 支持 VitePress 暗色主题切换 */
.dark :root,
html[data-theme="dark"] :root,
html.dark :root {
  /* Dark theme colors */
  --core-gradient-start: #8a2525;
  --core-gradient-end: #b53030;
  --func-gradient-start: #5d5d40;
  --func-gradient-end: #6c6c4a;
  --protocol-gradient-start: #515d40;
  --protocol-gradient-end: #5d6938;
  --util-gradient-start: #56694d;
  --util-gradient-end: #495736;
  --db-gradient-start: #294d73;
  --db-gradient-end: #366ca6;
  --admin-gradient-start: #5d2933;
  --admin-gradient-end: #7a293f;
  --right-gradient-start: #294d73;
  --right-gradient-end: #366ca6;
  --left-gradient-start: #294d66;
  --left-gradient-end: #386c7a;
  --text-color: #ffffff;
  --logo-color: #d7b8fc;
  --border-color: #aaaaaa;
  --line-color: #aaaaaa;
}

/* 系统偏好暗色模式下的文本强制白色 */
@media (prefers-color-scheme: dark) {
  svg text.title,
  svg text.section-title,
  svg text.plugin-text,
  svg text.core-text,
  svg text.db-text,
  svg text.sidebar-text,
  svg text.icon-text {
    fill: #ffffff !important;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.8);
  }

  svg text.logo-text {
    fill: #d7b8fc !important;
  }
}

/* VitePress 暗色主题下的文本强制白色 */
.dark svg text.title,
.dark svg text.section-title,
.dark svg text.plugin-text,
.dark svg text.core-text,
.dark svg text.db-text,
.dark svg text.sidebar-text,
.dark svg text.icon-text,
html[data-theme="dark"] svg text.title,
html[data-theme="dark"] svg text.section-title,
html[data-theme="dark"] svg text.plugin-text,
html[data-theme="dark"] svg text.core-text,
html[data-theme="dark"] svg text.db-text,
html[data-theme="dark"] svg text.sidebar-text,
html[data-theme="dark"] svg text.icon-text,
html.dark svg text.title,
html.dark svg text.section-title,
html.dark svg text.plugin-text,
html.dark svg text.core-text,
html.dark svg text.db-text,
html.dark svg text.sidebar-text,
html.dark svg text.icon-text {
  fill: #ffffff !important;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.8);
}

.dark svg text.logo-text,
html[data-theme="dark"] svg text.logo-text,
html.dark svg text.logo-text {
  fill: #d7b8fc !important;
}

/* 应用样式到 SVG 元素 */
.title {
  font-size: 24px;
  font-weight: bold;
  text-anchor: middle;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  text-anchor: middle;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
}

.plugin-text,
.core-text,
.db-text,
.sidebar-text {
  font-size: 12px;
  text-anchor: middle;
}

.icon-text {
  font-size: 14px;
  font-weight: bold;
  text-anchor: middle;
}

.section-box {
  opacity: 0.8;
}

.connection-line {
  stroke: var(--line-color);
  stroke-width: 2;
  stroke-dasharray: 5;
}
</style>
