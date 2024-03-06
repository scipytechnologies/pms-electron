import http from 'http'
import fs from 'fs'
import YAML from 'yaml'

function fetchToken(apiUrl) {
    return new Promise((resolve, reject) => {
        http.get(apiUrl, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    if (jsonData) {
                        resolve(jsonData);
                    } else {
                        reject(new Error('Token not found in API response.'));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

export async function updateElectronBuilderToken() {
  const apiUrl = 'http://52.66.119.51:9000/user/getGitToken' // Replace with your API endpoint
  try {
    const token = await fetchToken(apiUrl)
    console.log(token)
    // Read the existing YAML data from the file
    const yamlData = fs.readFileSync('./resources/app-update.yml', 'utf8')

    // Parse YAML data into a JavaScript object
    const config = YAML.parse(yamlData)

    // Update the token property in the config object
    config.token = token

    // Stringify the updated config object back into YAML format
    const updatedYamlData = YAML.stringify(config)

    // Write the updated YAML data back to the file
    fs.writeFileSync('./resources/app-update.yml', updatedYamlData)

    console.log('Token in Electron Builder config updated successfully.')
  } catch (error) {
    console.error('Error fetching or updating token:', error)
  }
}
