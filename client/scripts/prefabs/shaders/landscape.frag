// uniform sampler2D baseTexture;
uniform vec3 myLightPos;
uniform sampler2D tDiffuse;

varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;

void main()
{
    vec4 addedLights = vec4(0.0, 0.0, 0.0, 1.0);
    // vec3 lightDirection = normalize(vPos-normalize(myLightPos));
    // addedLights.rgb += clamp(dot(-vNormal, -lightDirection), 0.0, 1.0);

    addedLights.r = max(0.0, dot(vNormal, normalize(myLightPos)));

    gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0) * addedLights;
    if (mod(vUv.x*5.0, 1.0) < 0.5) gl_FragColor = vec4(0.5, 0.5, 0.8, 1.0);
    if (mod(vUv.y*5.0, 1.0) < 0.5) gl_FragColor = vec4(1.0, 0.5, 0.5, 1.0);
    // if (vUv.x > 0.9) gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    gl_FragColor = vec4(0.66) - texture2D( tDiffuse, vUv ) * vec4(1.0, 0.9, 1.0, 1.0);
}