export const getCores = (data: any[]) =>
  data.map((cores: any, index: number) => {
    return `Core-${index + 1}: [Flight: ${cores.flight}, Reuse Count: ${
      cores.core.reuse_count
    }, Status: ${cores.core.status ? cores.core.status : 'NA'}]`;
  });

export const getPayloads = (data: any[]) =>
  data.map((payloads: any, index: number) => {
    return `Payload-${index + 1}: [Type: ${payloads.payload_type}, Mass (kg): ${
      payloads.payload_mass_kg ? payloads.payload_mass_kg : 'NA'
    }] `;
  });
