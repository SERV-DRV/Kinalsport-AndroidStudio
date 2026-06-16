import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Field from './src/fields/field.model.js';

dotenv.config();

const FIELDS_DATA = [
  {
    fieldName: 'Cancha Premium Futbol 5 - Zona A',
    fieldType: 'SINTETICA',
    capacity: 'FUTBOL_5',
    pricePerHour: 150,
    description: 'Cancha sintética con excelente iluminación LED y drenaje. Ideal para competencias.',
    image: 'https://res.cloudinary.com/drafrahtw/image/upload/v1778003111/kinal_sports/fields/cancha5-a06c556e.jpg',
    isActive: true,
  },
  {
    fieldName: 'Cancha Natural Futbol 7',
    fieldType: 'NATURAL',
    capacity: 'FUTBOL_7',
    pricePerHour: 200,
    description: 'Cancha de pasto natural mantenida profesionalmente. Perfecta para torneos.',
    isActive: true,
  },
  {
    fieldName: 'Cancha Futbol 11 - Estadio',
    fieldType: 'SINTETICA',
    capacity: 'FUTBOL_11',
    pricePerHour: 350,
    description: 'Campo completo de futbol 11 con sistema de riego automático y tribunas.',
    isActive: true,
  },
  {
    fieldName: 'Cancha Concreto Futbol 5 - Zona B',
    fieldType: 'CONCRETO',
    capacity: 'FUTBOL_5',
    pricePerHour: 100,
    description: 'Cancha de concreto con buena resistencia. Acceso rápido y económico.',
    isActive: true,
  },
  {
    fieldName: 'Cancha Premium Futbol 7 - Noche',
    fieldType: 'SINTETICA',
    capacity: 'FUTBOL_7',
    pricePerHour: 250,
    description: 'Cancha sintética con iluminación nocturna profesional. Disponible horario extendido.',
    isActive: true,
  },
  {
    fieldName: 'Cancha Futbol 5 - Principiantes',
    fieldType: 'NATURAL',
    capacity: 'FUTBOL_5',
    pricePerHour: 120,
    description: 'Cancha pequeña ideal para entrenamientos y práctica. Ambiente familiar.',
    isActive: true,
  },
];

async function seedFields() {
  try {
    const mongoUri = process.env.URI_MONGODB || 'mongodb://localhost:27017/kinalsports';
    
    await mongoose.connect(mongoUri);
    console.log('✓ Conectado a MongoDB');

    // Limpiar canchas existentes (opcional)
    await Field.deleteMany({});
    console.log('✓ Canchas anteriores eliminadas');

    // Insertar nuevas canchas
    const insertedFields = await Field.insertMany(FIELDS_DATA);
    console.log(`✓ ${insertedFields.length} canchas agregadas exitosamente:`);
    
    insertedFields.forEach((field, index) => {
      console.log(`  ${index + 1}. ${field.fieldName} (ID: ${field._id})`);
    });

    await mongoose.disconnect();
    console.log('\n✓ Desconexión completada');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error al agregar canchas:', error.message);
    process.exit(1);
  }
}

seedFields();
