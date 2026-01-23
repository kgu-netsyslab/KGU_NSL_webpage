import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 리플 효과를 담당하는 3D 씬 컴포넌트
const RippleScene = ({ imageUrl }) => {
  const texture = useTexture(imageUrl);
  const { size, viewport } = useThree();
  const mesh = useRef();

  // 쉐이더 코드 (그래픽카드에서 직접 실행되는 프로그램)
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform sampler2D uTexture;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        
        // 화면 비율 보정 (찌그러짐 방지)
        float aspect = uResolution.x / uResolution.y;
        vec2 aspectUv = vec2(uv.x * aspect, uv.y);
        vec2 aspectMouse = vec2(uMouse.x * aspect, uMouse.y);

        // 1. 마우스와 현재 픽셀 사이의 거리 계산
        float dist = distance(aspectUv, aspectMouse);
        
        // 2. 효과 범위 설정 (0.25 반경 내에서만 효과 적용, 멀어지면 0)
        float radius = 0.35; 
        float strength = smoothstep(radius, 0.0, dist); 

        // 3. 물결(Wave) 효과 계산
        vec2 wave = vec2(
          sin(uv.y * 20.0 + uTime * 3.0),
          cos(uv.x * 20.0 + uTime * 3.0)
        );

        // 4. 거리에 따른 왜곡 적용 (가까울수록 strength가 커짐)
        vec2 distortedUv = uv + wave * strength * 0.02;

        vec4 color = texture2D(uTexture, distortedUv);
        gl_FragColor = vec4(color.rgb * 0.6, color.a);
      }
    `
  }), [texture, size]);

  // 매 프레임마다 실행되는 애니메이션 루프
  useFrame((state) => {
    if (mesh.current) {
      // 시간 업데이트
      mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // 마우스 위치 부드럽게 따라가기 (Lerp)
      const targetX = (state.pointer.x + 1) / 2;
      const targetY = (state.pointer.y + 1) / 2;
      
      mesh.current.material.uniforms.uMouse.value.x += (targetX - mesh.current.material.uniforms.uMouse.value.x) * 0.1;
      mesh.current.material.uniforms.uMouse.value.y += (targetY - mesh.current.material.uniforms.uMouse.value.y) * 0.1;
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
};

// Canvas로 감싸는 래퍼 컴포넌트
const RippleShaderBackground = ({ imageUrl }) => {
  return (
    <div className="absolute inset-0 z-0 bg-gray-900">
      <Canvas>
        <Suspense fallback={null}>
          <RippleScene imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
      {/* 원본 이미지를 뒤에 깔아서 로딩 중에 깜빡임 방지 */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </div>
  );
};

export default RippleShaderBackground;
