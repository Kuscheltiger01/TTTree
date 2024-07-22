import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'

const _layout = () => {
  return (
    <Tabs
        tabBar={props=> <TabBar {...props} />}
    >
        <Tabs.Screen
              name='index'
              options={{
                  title: "Home"
              }}
        />
        <Tabs.Screen
              name='übungen'
              options={{
                  title: "Training"
              }}
        />
        <Tabs.Screen
              name='rangliste'
              options={{
                  title: "Community"
              }}
        />
         <Tabs.Screen
              name='profile'
              options={{
                  title: "Profil"
              }}
        />
    </Tabs>
  )
}

export default _layout