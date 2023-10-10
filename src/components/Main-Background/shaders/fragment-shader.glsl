uniform vec3 uColor;
varying vec2 vUv;

void main(){
  float alpha = 1.0 - smoothstep(-0.5, 0.5, length(gl_PointCoord - vec2(0.5)));
  gl_FragColor=vec4(uColor, alpha);
}
