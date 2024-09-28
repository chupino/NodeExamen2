const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'mi-aplicacion',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const iniciarProductor = async () => {
  await producer.connect();
  console.log('Productor Kafka conectado');
};

module.exports = {
  producer,
  iniciarProductor
};