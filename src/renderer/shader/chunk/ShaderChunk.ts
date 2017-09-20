export const empty:GLSLChunk = {top:"", define:"", varDeclare:"", funcDeclare:"", funcDefine:"", body:""};
export const NULL:number = -1.0;
export const common_define:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const common_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const common_function:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "mat2 transpose(mat2 m) {\n  return mat2(  m[0][0], m[1][0],   // new col 0\n                m[0][1], m[1][1]    // new col 1\n             );\n  }\nmat3 transpose(mat3 m) {\n  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0\n                m[0][1], m[1][1], m[2][1],  // new col 1\n                m[0][2], m[1][2], m[2][2]   // new col 1\n             );\n  }\n\n//bool isRenderListEmpty(int isRenderListEmpty){\n//  return isRenderListEmpty == 1;\n//}\n",body: ""};
export const common_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const highp_fragment:GLSLChunk = {top: "precision highp float;\nprecision highp int;\n",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const lowp_fragment:GLSLChunk = {top: "precision lowp float;\nprecision lowp int;\n",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const mediump_fragment:GLSLChunk = {top: "precision mediump float;\nprecision mediump int;\n",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const modelMatrix_noInstance_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "mat4 getModelMatrix(){\n    return u_mMatrix;\n}\n",body: "mat4 mMatrix = getModelMatrix();\n"};
export const webgl1_noShadowMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getShadowVisibility() {\n        return vec3(1.0);\n    }\n",body: ""};
export const webgl1_basic_end_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "gl_FragColor = vec4(totalColor.rgb, totalColor.a * u_opacity);\n"};
export const webgl1_basic_materialColor_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "vec4 totalColor = vec4(u_color, 1.0);\n"};
export const frontLight_common:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "vec3 getDirectionLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);\n",funcDefine: "vec3 getDirectionLightDirByLightPos(vec3 lightPos){\n    return lightPos - vec3(0.0);\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos){\n    return lightPos - v_worldPosition;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n",body: ""};
export const frontLight_common_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_worldPosition;\n#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 position;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n",funcDeclare: "",funcDefine: "",body: ""};
export const frontLight_common_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_worldPosition;\n#if POINT_LIGHTS_COUNT > 0\n    struct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\n    struct DirectionLight {\n    vec3 position;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n",funcDeclare: "",funcDefine: "",body: ""};
export const frontLight_end_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "gl_FragColor = totalColor;\n"};
export const frontLight_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "float getBlinnShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n        vec3 halfAngle = normalize(lightDir + viewDir);\n        float blinnTerm = dot(normal, halfAngle);\n\n        blinnTerm = clamp(blinnTerm, 0.0, 1.0);\n        blinnTerm = dotResultBetweenNormAndLight != 0.0 ? blinnTerm : 0.0;\n        blinnTerm = pow(blinnTerm, shininess);\n\n        return blinnTerm;\n}\n\nfloat getPhongShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n        vec3 reflectDir = reflect(-lightDir, normal);\n        float phongTerm = dot(viewDir, reflectDir);\n\n        phongTerm = clamp(phongTerm, 0.0, 1.0);\n        phongTerm = dotResultBetweenNormAndLight != 0.0 ? phongTerm : 0.0;\n        phongTerm = pow(phongTerm, shininess);\n\n        return phongTerm;\n}\n\nvec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir)\n{\n        vec3 materialLight = getMaterialLight();\n        vec3 materialDiffuse = getMaterialDiffuse();\n        vec3 materialSpecular = u_specular;\n        vec3 materialEmission = getMaterialEmission();\n\n        float specularStrength = getSpecularStrength();\n\n        float dotResultBetweenNormAndLight = dot(normal, lightDir);\n        float diff = max(dotResultBetweenNormAndLight, 0.0);\n\n        vec3 emissionColor = materialEmission;\n\n        vec3 ambientColor = (u_ambient + materialLight) * materialDiffuse.rgb;\n\n\n        if(u_lightModel == 3){\n            return emissionColor + ambientColor;\n        }\n\n//        vec4 diffuseColor = vec4(color * materialDiffuse.rgb * diff * intensity, materialDiffuse.a);\n        vec3 diffuseColor = color * materialDiffuse.rgb * diff * intensity;\n\n        float spec = 0.0;\n\n        if(u_lightModel == 2){\n                spec = getPhongShininess(u_shininess, normal, lightDir, viewDir, diff);\n        }\n        else if(u_lightModel == 1){\n                spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);\n        }\n\n        vec3 specularColor = spec * materialSpecular * specularStrength * intensity;\n\n//        return vec4(emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor), diffuseColor.a);\n        return emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor);\n}\n\n\n\n\n#if POINT_LIGHTS_COUNT > 0\n        vec3 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir)\n{\n        //lightDir is not normalize computing distance\n        float distance = length(lightDir);\n\n        float attenuation = 0.0;\n\n        if(distance < light.range)\n        {\n            attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));\n        }\n\n        lightDir = normalize(lightDir);\n\n        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\n        vec3 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir)\n{\n        float attenuation = 1.0;\n\n        lightDir = normalize(lightDir);\n\n        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\nvec4 calcTotalLight(vec3 norm, vec3 viewDir){\n    vec4 totalLight = vec4(0.0, 0.0, 0.0, 1.0);\n\n    #if POINT_LIGHTS_COUNT > 0\n                for(int i = 0; i < POINT_LIGHTS_COUNT; i++){\n                totalLight += vec4(calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir), 0.0);\n        }\n    #endif\n\n    #if DIRECTION_LIGHTS_COUNT > 0\n                for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){\n                totalLight += vec4(calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir), 0.0);\n        }\n    #endif\n\n        return totalLight;\n}\n",body: "vec3 normal = normalize(getNormal());\n\n#ifdef BOTH_SIdE\nnormal = normal * (-1.0 + 2.0 * float(gl_FrontFacing));\n#endif\n\nvec3 viewDir = normalize(getViewDir());\n\nvec4 totalColor = calcTotalLight(normal, viewDir);\n\ntotalColor.a *= u_opacity;\n\ntotalColor.rgb = totalColor.rgb * getShadowVisibility();\n"};
export const frontLight_setWorldPosition_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "v_worldPosition = vec3(mMatrix * vec4(a_position, 1.0));\n"};
export const frontLight_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);\n"};
export const webgl1_normalMatrix_noInstance_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "mat3 normalMatrix = u_normalMatrix;\n"};
export const webgl1_basic_map_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_mapCoord0;\n",funcDeclare: "",funcDefine: "",body: "totalColor *= texture2D(u_sampler2D0, v_mapCoord0);\n"};
export const webgl1_basic_map_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_mapCoord0;\n",funcDeclare: "",funcDefine: "",body: "//    vec2 sourceTexCoord0 = a_texCoord * u_map0SourceRegion.zw + u_map0SourceRegion.xy;\n//\n//    v_mapCoord0 = sourceTexCoord0 * u_map0RepeatRegion.zw + u_map0RepeatRegion.xy;\n\n    v_mapCoord0 = a_texCoord;\n"};
export const webgl1_diffuseMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_diffuseMapTexCoord;\n",funcDeclare: "",funcDefine: "vec3 getMaterialDiffuse() {\n        return texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord).rgb;\n    }\n",body: ""};
export const webgl1_diffuseMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_diffuseMapTexCoord;\n",funcDeclare: "",funcDefine: "",body: "//todo optimize(combine, reduce compute numbers)\n    //todo BasicTexture extract textureMatrix\n//    vec2 sourceTexCoord = a_texCoord * u_diffuseMapSourceRegion.zw + u_diffuseMapSourceRegion.xy;\n//    v_diffuseMapTexCoord = sourceTexCoord * u_diffuseMapRepeatRegion.zw + u_diffuseMapRepeatRegion.xy;\n\n    v_diffuseMapTexCoord = a_texCoord;\n"};
export const webgl1_noDiffuseMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getMaterialDiffuse() {\n        return u_diffuse;\n    }\n",body: ""};
export const webgl1_noEmissionMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getMaterialEmission() {\n        return u_emission;\n    }\n",body: ""};
export const webgl1_noLightMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getMaterialLight() {\n        return vec3(0.0);\n    }\n",body: ""};
export const webgl1_noNormalMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_normal;\n",funcDeclare: "vec3 getNormal();\n\n",funcDefine: "vec3 getNormal(){\n    return v_normal;\n}\n\n#if POINT_LIGHTS_COUNT > 0\nvec3 getPointLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return getPointLightDirByLightPos(u_pointLights[x].position);\n        }\n    }\n    /*!\n    solve error in window7 chrome/firefox:\n    not all control paths return a value.\n    failed to create d3d shaders\n    */\n    return vec3(0.0);\n}\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvec3 getDirectionLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return getDirectionLightDirByLightPos(u_directionLights[x].position);\n        }\n    }\n\n    /*!\n    solve error in window7 chrome/firefox:\n    not all control paths return a value.\n    failed to create d3d shaders\n    */\n    return vec3(0.0);\n}\n#endif\n\n\nvec3 getViewDir(){\n    return normalize(u_cameraPos - v_worldPosition);\n}\n",body: ""};
export const webgl1_noNormalMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec3 v_normal;\n",funcDeclare: "",funcDefine: "",body: "v_normal = normalize(normalMatrix * a_normal);\n"};
export const webgl1_noSpecularMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "float getSpecularStrength() {\n        return 1.0;\n    }\n",body: ""};
export const webgl1_specularMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_specularMapTexCoord;\n",funcDeclare: "",funcDefine: "float getSpecularStrength() {\n        return texture2D(u_specularMapSampler, v_specularMapTexCoord).r;\n    }\n",body: ""};
export const webgl1_specularMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "varying vec2 v_specularMapTexCoord;\n",funcDeclare: "",funcDefine: "",body: "v_specularMapTexCoord = a_texCoord;\n"};
export const webgl2_deferLightPass_directionLight_noNormalMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getDirectionLightDir(){\n    return getDirectionLightDirByLightPos(directionLightUbo.lightPosition.xyz);\n}\n",body: ""};
export const webgl2_noShadowMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getShadowVisibility() {\n        return vec3(1.0);\n    }\n",body: ""};
export const webgl2_deferLightPass_pointLight_noNormalMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getPointLightDir(vec3 worldPosition){\n    return getPointLightDirByLightPos(pointLightUbo.lightPosition.xyz, worldPosition);\n}\n",body: ""};
export const webgl2_basic_end_fragment:GLSLChunk = {top: "",define: "",varDeclare: "out vec4 fragColor;\n",funcDeclare: "",funcDefine: "",body: "fragColor = vec4(totalColor.rgb, totalColor.a * u_opacity);\n"};
export const webgl2_basic_materialColor_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "vec4 totalColor = vec4(u_color, 1.0);\n"};
export const webgl2_basic_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const ubo_light:GLSLChunk = {top: "",define: "",varDeclare: "layout(std140) uniform LightUbo {\n/*! vec4(lightModel, 0.0, 0.0, 0.0) */\n    vec4 lightModel;\n} lightUbo;\n",funcDeclare: "",funcDefine: "",body: ""};
export const ubo_camera:GLSLChunk = {top: "",define: "",varDeclare: "layout(std140) uniform CameraUbo {\n    mat4 vMatrix;\n    mat4 pMatrix;\n    vec4 cameraPos;\n    vec4 normalMatrixCol1;\n    vec4 normalMatrixCol2;\n    vec4 normalMatrixCol3;\n} cameraUbo;\n",funcDeclare: "",funcDefine: "",body: ""};
export const version:GLSLChunk = {top: "#version 300 es\n",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const webgl2_common_define:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const webgl2_common_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const webgl2_common_function:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const webgl2_common_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const webgl2_basic_map_fragment:GLSLChunk = {top: "",define: "",varDeclare: "in vec2 v_mapCoord0;\n",funcDeclare: "",funcDefine: "",body: "totalColor *= texture(u_sampler2D0, v_mapCoord0);\n"};
export const webgl2_basic_map_vertex:GLSLChunk = {top: "",define: "",varDeclare: "out vec2 v_mapCoord0;\n",funcDeclare: "",funcDefine: "",body: "//    vec2 sourceTexCoord0 = a_texCoord * u_map0SourceRegion.zw + u_map0SourceRegion.xy;\n//\n//    v_mapCoord0 = sourceTexCoord0 * u_map0RepeatRegion.zw + u_map0RepeatRegion.xy;\n\n    v_mapCoord0 = a_texCoord;\n"};
export const gbuffer_common_fragment:GLSLChunk = {top: "",define: "",varDeclare: "in vec3 v_worldPosition;\n",funcDeclare: "",funcDefine: "",body: ""};
export const gbuffer_common_vertex:GLSLChunk = {top: "",define: "",varDeclare: "out vec3 v_worldPosition;\n",funcDeclare: "",funcDefine: "",body: ""};
export const gbuffer_end_fragment:GLSLChunk = {top: "",define: "",varDeclare: "layout(location=0) out vec4 gbufferPosition;\nlayout(location=1) out vec4 gbufferNormal;\nlayout(location=2) out vec4 gbufferColor;\n",funcDeclare: "",funcDefine: "",body: "gbufferPosition.xyz = v_worldPosition;\n    gbufferPosition.w = u_shininess;\n    gbufferNormal.xyz = getNormal();\n    gbufferNormal.w = 1.0;\n    gbufferColor.xyz = getMaterialDiffuse();\n    gbufferColor.w = getSpecularStrength();\n"};
export const gbuffer_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const gbuffer_setWorldPosition_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "v_worldPosition = vec3(mMatrix * vec4(a_position, 1.0));\n"};
export const gbuffer_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "//todo use u_vpMatrix\n    gl_Position = cameraUbo.pMatrix * cameraUbo.vMatrix * vec4(v_worldPosition, 1.0);\n//    gl_Position = u_vpMatrix * vec4(v_worldPosition, 1.0);\n"};
export const deferLightPass_common:GLSLChunk = {top: "",define: "",varDeclare: "in vec2 v_texcoord;\n",funcDeclare: "",funcDefine: "",body: "vec4 colorData = texture(u_colorBuffer, v_texcoord);\n\n            vec3 diffuseColor = colorData.xyz;\n"};
export const deferLightPass_directionLight_pointLight_common:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "float getBlinnShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n        vec3 halfAngle = normalize(lightDir + viewDir);\n        float blinnTerm = dot(normal, halfAngle);\n\n        blinnTerm = clamp(blinnTerm, 0.0, 1.0);\n        blinnTerm = dotResultBetweenNormAndLight != 0.0 ? blinnTerm : 0.0;\n        blinnTerm = pow(blinnTerm, shininess);\n\n        return blinnTerm;\n}\n\nfloat getPhongShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n        vec3 reflectDir = reflect(-lightDir, normal);\n        float phongTerm = dot(viewDir, reflectDir);\n\n        phongTerm = clamp(phongTerm, 0.0, 1.0);\n        phongTerm = dotResultBetweenNormAndLight != 0.0 ? phongTerm : 0.0;\n        phongTerm = pow(phongTerm, shininess);\n\n        return phongTerm;\n}\n\n\n//todo optimize specular color\nvec3 getSpecularColor(vec3 diffuseColor)\n{\n    return diffuseColor;\n}\n\n",body: "vec4 positionData = texture(u_positionBuffer,\nv_texcoord);\n\n            vec3 position = positionData.xyz;\n            float shininess = positionData.w;\n\n\n            vec3 normal = normalize(texture(u_normalBuffer, v_texcoord).rgb);\n\n            float specularStrength  = colorData.w;\n\n\n\nvec3 viewDir = normalize(getViewDir(position));\n"};
export const deferLightPass_end_fragment:GLSLChunk = {top: "",define: "",varDeclare: "out vec4 fragColor;\n",funcDeclare: "",funcDefine: "",body: "fragColor = totalColor;\n"};
export const deferLightPass_vertex:GLSLChunk = {top: "",define: "",varDeclare: "out vec2 v_texcoord;\n",funcDeclare: "",funcDefine: "",body: "\n        v_texcoord = a_texCoord * 0.5 + vec2(0.5);\n\n    gl_Position = vec4(a_position, 1.0);\n"};
export const webgl2_normalMatrix_noInstance_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "mat3 normalMatrix = mat3(\nvec3(cameraUbo.normalMatrixCol1),\nvec3(cameraUbo.normalMatrixCol2),\nvec3(cameraUbo.normalMatrixCol3)\n);\n"};
export const webgl2_diffuseMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "in vec2 v_diffuseMapTexCoord;\n",funcDeclare: "",funcDefine: "vec3 getMaterialDiffuse() {\n        return texture(u_diffuseMapSampler, v_diffuseMapTexCoord).rgb;\n    }\n",body: ""};
export const webgl2_diffuseMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "//	varying vec2 v_diffuseMapTexCoord;\n	out vec2 v_diffuseMapTexCoord;\n",funcDeclare: "",funcDefine: "",body: "//todo optimize(combine, reduce compute numbers)\n    //todo BasicTexture extract textureMatrix\n//    vec2 sourceTexCoord = a_texCoord * u_diffuseMapSourceRegion.zw + u_diffuseMapSourceRegion.xy;\n//    v_diffuseMapTexCoord = sourceTexCoord * u_diffuseMapRepeatRegion.zw + u_diffuseMapRepeatRegion.xy;\n\n    v_diffuseMapTexCoord = a_texCoord;\n"};
export const webgl2_gbuffer_noNormalMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "in vec3 v_normal;\n",funcDeclare: "vec3 getNormal();\n\n",funcDefine: "vec3 getNormal(){\n    return v_normal;\n}\n\n",body: ""};
export const webgl2_gbuffer_noNormalMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "out vec3 v_normal;\n",funcDeclare: "",funcDefine: "",body: "v_normal = normalize(normalMatrix * a_normal);\n"};
export const webgl2_noDiffuseMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getMaterialDiffuse() {\n        return u_diffuse;\n    }\n",body: ""};
export const webgl2_noSpecularMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "float getSpecularStrength() {\n        return 1.0;\n    }\n",body: ""};
export const webgl2_specularMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "in vec2 v_specularMapTexCoord;\n",funcDeclare: "",funcDefine: "float getSpecularStrength() {\n        return texture(u_specularMapSampler, v_specularMapTexCoord).r;\n    }\n",body: ""};
export const webgl2_specularMap_vertex:GLSLChunk = {top: "",define: "",varDeclare: "out vec2 v_specularMapTexCoord;\n",funcDeclare: "",funcDefine: "",body: "v_specularMapTexCoord = a_texCoord;\n"};
export const deferLightPass_ambientLight_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 calcLight(vec3 materialDiffuse)\n{\n    vec3 materialLight = getMaterialLight();\n    return (ambientLightUbo.lightColorData.xyz + materialLight) * materialDiffuse;\n}\n\nvec3 calcAmbientLight(vec3 diffuseColor)\n{\n    return calcLight(diffuseColor);\n}\n\nvec4 calcTotalLight(vec3 diffuseColor){\n    return vec4(calcAmbientLight(diffuseColor), 1.0);\n}\n",body: "vec4 totalColor = calcTotalLight(diffuseColor);\n"};
export const ubo_ambientLight:GLSLChunk = {top: "",define: "",varDeclare: "layout(std140) uniform AmbientLightUbo {\n/*! vec4(colorVec3, 0.0) */\nvec4 lightColorData;\n} ambientLightUbo;\n",funcDeclare: "",funcDefine: "",body: ""};
export const deferLightPass_directionLight_common:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getDirectionLightDirByLightPos(vec3 lightPos){\n    return lightPos - vec3(0.0);\n}\n",body: ""};
export const deferLightPass_directionLight_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 calcLight(vec3 lightDir, vec3 color, float intensity, vec3 normal, vec3 viewDir, vec3 materialDiffuse, float specularStrength, float shininess)\n{\n        vec3 materialLight = getMaterialLight();\n        vec3 materialSpecular = getSpecularColor(materialDiffuse);\n\n        vec3 materialEmission = getMaterialEmission();\n\n        float dotResultBetweenNormAndLight = dot(normal, lightDir);\n        float diff = max(dotResultBetweenNormAndLight, 0.0);\n\n        vec3 emissionColor = materialEmission;\n\n//        vec3 ambientColor = (u_ambient + materialLight) * materialDiffuse;\n//        vec3 ambientColor = vec3(0.0);\n\n        float lightModel = lightUbo.lightModel.x;\n\n        if(lightModel == 3.0){\n//            return emissionColor + ambientColor;\n            return emissionColor;\n        }\n\n        vec3 diffuseColor = color * materialDiffuse * diff * intensity;\n\n        float spec = 0.0;\n\n        if(lightModel == 2.0){\n                spec = getPhongShininess(shininess, normal, lightDir, viewDir, diff);\n        }\n        else if(lightModel == 1.0){\n                spec = getBlinnShininess(shininess, normal, lightDir, viewDir, diff);\n        }\n\n        vec3 specularColor = spec * materialSpecular * specularStrength * intensity;\n\n//        return emissionColor + ambientColor + attenuation * (diffuseColor + specularColor);\n        return emissionColor + diffuseColor + specularColor;\n}\n\n\n\n        vec3 calcDirectionLight(vec3 lightDir, vec3 normal, vec3 viewDir, vec3 diffuseColor, float specularStrength, float shininess)\n{\n        //lightDir is not normalize computing distance\n        float distance = length(lightDir);\n\n        lightDir = normalize(lightDir);\n\n        vec4 lightColorData = directionLightUbo.lightColorData;\n\n        return calcLight(lightDir, lightColorData.xyz, lightColorData.w, normal, viewDir, diffuseColor, specularStrength, shininess);\n}\n\nvec4 calcTotalLight(vec3 normal, vec3 viewDir, vec3 diffuseColor, float specularStrength, float shininess){\n    vec4 totalLight = vec4(0.0, 0.0, 0.0, 1.0);\n\n                totalLight += vec4(calcDirectionLight(getDirectionLightDir(), normal, viewDir, diffuseColor, specularStrength, shininess), 0.0);\n\n        return totalLight;\n}\n",body: "vec4 totalColor = calcTotalLight(normal, viewDir, diffuseColor, specularStrength, shininess);\n"};
export const ubo_directionLight:GLSLChunk = {top: "",define: "",varDeclare: "layout(std140) uniform DirectionLightUbo {\nvec4 lightPosition;\n/*! vec4(colorVec3, intensity) */\nvec4 lightColorData;\n} directionLightUbo;\n",funcDeclare: "",funcDefine: "",body: ""};
export const webgl2_deferLightPass_noNormalMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getViewDir(vec3 worldPosition){\n    return normalize(cameraUbo.cameraPos.xyz - worldPosition);\n}\n",body: ""};
export const webgl2_noEmissionMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getMaterialEmission() {\n    //todo support emission color\n//        return u_emission;\n        return vec3(0.0);\n    }\n",body: ""};
export const webgl2_noLightMap_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getMaterialLight() {\n        return vec3(0.0);\n    }\n",body: ""};
export const deferLightPass_pointLight_common:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n",body: ""};
export const deferLightPass_pointLight_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir, vec3 materialDiffuse, float specularStrength, float shininess)\n{\n        vec3 materialLight = getMaterialLight();\n        vec3 materialSpecular = getSpecularColor(materialDiffuse);\n\n        vec3 materialEmission = getMaterialEmission();\n\n        float dotResultBetweenNormAndLight = dot(normal, lightDir);\n        float diff = max(dotResultBetweenNormAndLight, 0.0);\n\n        vec3 emissionColor = materialEmission;\n\n//        vec3 ambientColor = (u_ambient + materialLight) * materialDiffuse;\n//        vec3 ambientColor = vec3(0.0);\n\n        float lightModel = lightUbo.lightModel.x;\n\n        if(lightModel == 3.0){\n//            return emissionColor + ambientColor;\n            return emissionColor;\n        }\n\n        vec3 diffuseColor = color * materialDiffuse * diff * intensity;\n\n        float spec = 0.0;\n\n        if(lightModel == 2.0){\n                spec = getPhongShininess(shininess, normal, lightDir, viewDir, diff);\n        }\n        else if(lightModel == 1.0){\n                spec = getBlinnShininess(shininess, normal, lightDir, viewDir, diff);\n        }\n\n        vec3 specularColor = spec * materialSpecular * specularStrength * intensity;\n\n//        return emissionColor + ambientColor + attenuation * (diffuseColor + specularColor);\n        return emissionColor + attenuation * (diffuseColor + specularColor);\n}\n\n\n\n        vec3 calcPointLight(vec3 lightDir, vec3 normal, vec3 viewDir, vec3 diffuseColor, float specularStrength, float shininess)\n{\n        //lightDir is not normalize computing distance\n        float distance = length(lightDir);\n\n        float attenuation = 0.0;\n\n        vec4 lightData = pointLightUbo.lightData;\n\n//        mat3 normalMatrix = cameraUbo.normalMatrix;\n\n//        if(normalMatrix[0][3] == 0.0){\n//            return vec3(0.5);\n//        }\n\n        if(distance >= lightData.w){\n            return vec3(0.0);\n        }\n\n        attenuation = 1.0 / (lightData.x + lightData.y * distance + lightData.z * (distance * distance));\n\n        lightDir = normalize(lightDir);\n\n        vec4 lightColorData = pointLightUbo.lightColorData;\n\n        return calcLight(lightDir, lightColorData.xyz, lightColorData.w, attenuation, normal, viewDir, diffuseColor, specularStrength, shininess);\n}\n\nvec4 calcTotalLight(vec3 normal, vec3 position, vec3 viewDir, vec3 diffuseColor, float specularStrength, float shininess){\n    vec4 totalLight = vec4(0.0, 0.0, 0.0, 1.0);\n\n                totalLight += vec4(calcPointLight(getPointLightDir(position), normal, viewDir, diffuseColor, specularStrength, shininess), 0.0);\n\n        return totalLight;\n}\n",body: "vec4 totalColor = calcTotalLight(normal, position, viewDir, diffuseColor, specularStrength, shininess);\n"};
export const ubo_pointLight:GLSLChunk = {top: "",define: "",varDeclare: "layout(std140) uniform PointLightUbo {\nvec4 lightPosition;\n/*! vec4(colorVec3, intensity) */\nvec4 lightColorData;\n/*! vec4(constant, linear, quadratic, radius) */\nvec4 lightData;\n} pointLightUbo;\n",funcDeclare: "",funcDefine: "",body: ""};
export type GLSLChunk = {top:string;define:string;varDeclare:string;funcDeclare:string;funcDefine:string;body:string;}
