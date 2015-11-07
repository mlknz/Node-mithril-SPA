uniform float mixAmount;
uniform float aspectRatio;
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
    float thetta = M_PI*(uv.y- 0.5);
	vec3 spherePosition = vUv.x < 0.5 ? vec3(sin(phi)*sin(thetta), sin(phi)*cos(thetta), cos(phi))*25.0 :
		vec3(-sin(phi)*sin(thetta), sin(phi)*cos(thetta), cos(phi))*25.0;

	mat3 rotateX = mat3(
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
	);
	vec3 flatPosition = vUv.y > 0.0 ? vec3(-position.x, position.y, position.z) : position;
	vec3 newPosition = mix( rotateZ * spherePosition + vec3(0.0, 0.0, 5.0), position, mixAmount );
	vNormal = mix(normal, spherePosition/20.0, mixAmount);
	gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}