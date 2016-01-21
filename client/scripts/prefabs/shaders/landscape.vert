uniform float mixAmount;
uniform float aspectRatio;
uniform sampler2D tDiffuse;
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;

#define M_PI 3.141592653589

vec3 projectOnPlane(vec3 coord) {
    // coords on sphere to lat/long
    vec3 vertPosition;
    vertPosition.x = atan(coord.y , -coord.x) / (2.0 * M_PI); // phi
    vertPosition.y = acos(coord.z) / M_PI; // ksi
    vertPosition.x = vertPosition.x > 0.0 ? -0.5 + vertPosition.x : 0.5 + vertPosition.x;
	vertPosition.y -= 0.5;

    return vertPosition;
}

void main()
{
    vUv = uv;

    float phi = M_PI*(uv.x*2.0);
    float theta = M_PI*(uv.y);
	vec3 spherePosition = vec3(sin(theta)*cos(phi), sin(theta)*sin(phi), cos(theta)) * 25.0;
	spherePosition = spherePosition * (1.0 + (0.63 - texture2D( tDiffuse, uv ).x)*0.28);
	/*mat3 rotateX = mat3(
		1.0, 0.0, 0.0,
		0.0, cos(M_PI/2.0), sin(M_PI/2.0),
		0.0, -sin(M_PI/2.0), cos(M_PI/2.0)
	);
	mat3 rotateY = mat3(
    	cos(M_PI/2.0), 0.0, -sin(M_PI/2.0),
    	0.0, 1.0, 0.0,
    	sin(M_PI/2.0), 0.0, cos(M_PI/2.0)
    );
	mat3 rotateZ = mat3(
		cos(M_PI/2.0), sin(M_PI/2.0), 0.0,
		-sin(M_PI/2.0), cos(M_PI/2.0), 0.0,
		0.0, 0.0, 1.0
	);*/
	vec3 flatPosition = vUv.y > 0.0 ? vec3(-position.x, position.y, position.z) : position;
	vec3 newPosition = mix( spherePosition, position, mixAmount );
	vNormal = mix(normal, spherePosition/25.0, mixAmount);
	gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}