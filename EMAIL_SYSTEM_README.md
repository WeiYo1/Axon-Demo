# Sistema de Email Dinámico - Documentación

## Funcionalidad Implementada

El sistema ahora captura **todos los datos** de la interfaz y los envía en un email estructurado con las imágenes correspondientes desde el schema.

### Datos Capturados

1. **Creative Type**: Automáticamente detecta si el usuario está en "Interactives" o "Video"
2. **Cards Seleccionadas**: Captura todas las cards que el usuario seleccione (con clase `.selected`)
3. **Priority**: Captura la prioridad seleccionada del dropdown
4. **Client Name**: Campo de texto "Company's name"
5. **Client URL**: Campo de texto "Paste your link here..."
6. **Additional Information**: Texto del textarea

### Cómo Funciona

#### 1. Detección de Página Activa
```javascript
// Detecta automáticamente si estás en firstPage (Interactives) o secondPage (Video)
const isFirstPage = !secondPage || secondPage.style.display === 'none';
const creativeType = isFirstPage ? 'Interactives' : 'Video';
```

#### 2. Captura de Cards Seleccionadas
El sistema busca todas las cards con clase `.selected`:
- En firstPage: `.card.selected`
- En secondPage: `.sp-card.selected`

#### 3. Matching con el Schema
Para cada card seleccionada:
1. Extrae el título y subtítulo de la card
2. Normaliza el texto (elimina espacios, caracteres especiales, convierte a minúsculas)
3. Busca en el schema el elemento correspondiente
4. Obtiene la URL de Cloudinary para esa imagen

```javascript
// Ejemplo de normalización
"Image convert" → "imageconvert"
"Static video" + "no animation, no music" → "staticvideo" + "noanimationnomusic"
```

#### 4. Generación del Email
El email se genera dinámicamente con:
- Una sección superior con toda la información del cliente
- Badge de prioridad con estilo destacado
- Grid de 2 columnas con las cards seleccionadas
- URLs correctas de Cloudinary para cada imagen

### Estructura del Email

```
┌─────────────────────────────────────┐
│   Creative Type: Interactives/Video │
│   Priority: [Badge con color]       │
│   Client Name: ...                  │
│   Client URL: ...                   │
│   Additional Info: ...              │
└─────────────────────────────────────┘

         Selected Creatives

┌──────────────┐  ┌──────────────┐
│   [Imagen]   │  │   [Imagen]   │
│   Título     │  │   Título     │
│   Subtitle   │  │   Subtitle   │
└──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐
│   [Imagen]   │  │   [Imagen]   │
│   Título     │  │   Título     │
│   Subtitle   │  │   Subtitle   │
└──────────────┘  └──────────────┘
```

### Soporte para Ambas Páginas

El sistema funciona en:
- ✅ **First Page** (Interactives): Botón `.submit-btn`
- ✅ **Second Page** (Video): Botón `.sp-submit-btn`

### Actualización del Schema

El schema ahora usa la nueva estructura:
- `schema.images.interactives` (antes `firstPage`)
- `schema.images.video` (antes `secondPage`)

### Ejemplo de Uso

1. Usuario selecciona "Interactives" o "Video"
2. Usuario hace clic en las cards que desea (se marcan con borde azul)
3. Usuario selecciona prioridad del dropdown
4. Usuario completa los campos de texto
5. Usuario presiona "Submit"
6. Sistema captura todo y envía email con las imágenes correctas

### Validación de Duplicados

El sistema **previene automáticamente** el envío de creativos duplicados:

#### Cómo Funciona
1. Detecta creativos duplicados comparando: `título + subtítulo`
2. Remueve automáticamente los duplicados
3. Muestra una alerta al usuario indicando cuántos duplicados se removieron
4. Registra en la consola qué creativos fueron removidos

#### Ejemplo
```
Usuario selecciona:
- Infographic
- Carousel  
- Infographic (duplicado)
- Review

Sistema envía:
- Infographic (solo 1)
- Carousel
- Review

Mensaje: "Se encontraron 1 creativo(s) duplicado(s) que han sido removidos del email."
```

#### Logs en Consola
```
⚠️ Creativo duplicado removido: Infographic (secondary text)
📋 Se removieron 1 creativo(s) duplicado(s)
✓ Total de creativos únicos a enviar: 3
```

### Ventajas

- ✅ **Dinámico**: No hay URLs hardcodeadas
- ✅ **Escalable**: Solo actualizar el schema para agregar nuevas imágenes
- ✅ **Robusto**: Maneja casos donde no hay información
- ✅ **Flexible**: Funciona con cualquier número de cards seleccionadas
- ✅ **Visual**: Email con el mismo diseño que la interfaz
- ✅ **Sin Duplicados**: Validación automática para evitar creativos repetidos
- ✅ **Validación de Vacíos**: No permite enviar sin al menos 1 creativo
