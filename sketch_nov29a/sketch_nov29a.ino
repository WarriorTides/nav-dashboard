#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BNO08x.h>

#define BNO08x_SAMPLERATE_DELAY_MS 10

Adafruit_BNO08x bno = Adafruit_BNO08x();

void setup() {
  Serial.begin(115200);
  
  if (!bno.begin_I2C()) {
    Serial.println("Failed to initialize BNO08x sensor!");
    while (1);
  }
}

void quaternion_Delta() {
  // Quaternion data 1
  Quaternion quat = bno.getQuat();  // No imu:: prefix here
  // Euler 1
  Vector<3> euler_one = quat.toEuler();  // No imu:: prefix here
  // delay between samples
  delay(BNO08x_SAMPLERATE_DELAY_MS);  // Corrected delay constant
  // Quaternion data 2
  Quaternion quat_two = bno.getQuat();  // No imu:: prefix here
  // Euler 2
  Vector<3> euler_two = quat_two.toEuler();  // No imu:: prefix here
  // quaternion comparison
  Quaternion quatDelta = quat_two * quat.conjugate();
  Vector<3> euler = quatDelta.toEuler();
  Serial.print(" X: ");
  Serial.print(euler.x() * RAD_TO_DEG, 2);  // No imu:: prefix here
  Serial.print(" Y: ");
  Serial.print(euler.y() * RAD_TO_DEG, 2);  // No imu:: prefix here
  Serial.print(" Z: ");
  Serial.print(euler.z() * RAD_TO_DEG, 2);  // No imu:: prefix here
  Serial.print("\t\t");
  // Euler comparison
  Vector<3> euler_comparison = euler_t
