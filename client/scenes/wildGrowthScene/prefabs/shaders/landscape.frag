uniform vec3 myLightPos;
uniform float landscapeAnimMix;
uniform sampler2D landscape;
uniform sampler2D landscapeOld;
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;

void main()
{
    vec4 addedLights = vec4(0.0, 0.0, 0.0, 1.0);
    // vec3 lightDirection = normalize(vPos-normalize(myLightPos));
    // addedLights.rgb += clamp(dot(-vNormal, -lightDirection), 0.0, 1.0);

    addedLights.r = max(0.0, dot(vNormal, normalize(myLightPos)));
    vec4 color = vec4(0.66) - texture2D( landscape, vUv ) * vec4(1.0, 0.9, 1.0, 1.0); // * addedLights;
    vec4 colorOld = vec4(0.66) - texture2D( landscapeOld, vUv ) * vec4(1.0, 0.9, 1.0, 1.0); // * addedLights;
    gl_FragColor = mix(colorOld, color, landscapeAnimMix);
}