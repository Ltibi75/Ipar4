from pymodbus.client import ModbusTcpClient

client = ModbusTcpClient(host='192.168.0.1')   # Create client object
client.connect()

client.write_coil(address=1, value=False, slave=1)

client.close()
